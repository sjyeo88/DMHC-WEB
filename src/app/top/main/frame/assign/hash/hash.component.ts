// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : hash                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Layout } from './../../../../layout.service';
import { HashService } from '../hash.service';
import { Hash, HashSub, Table } from '../hash.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { NewHashData, HashValidMsgs, ValidatorMSG, HashRegexValidators   } from './hash.form';
import { ConfirmationService } from 'primeng/primeng'

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.scss'],
  providers: [HashService, Table, NewHashData]
})
export class HashComponent implements OnInit {
  public hashTables:any[] = [];
  public msgs:Message[] = [];
  public hashes:{}[][] = [];
  public RowStyle:string= "body"
  public childNum:number = 0;
  public inputTable = [];
  public isSaving: boolean;
  public allHashLoaded: boolean;
  public allHashes: Hash[];
  public  pagFirstIndex:number = 0;
  public  pagPerView :number = 10;


  constructor(
    public lay: Layout,
    public hashServ: HashService,
    public newHash: NewHashData,
    public tableModel: Table,
    public el: ElementRef,
    public confirm:ConfirmationService,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[3];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;
    // console.log(this.hashTables);

    this.hashServ.getHashes()
    .then(data => {
      let idx = 0
      data.map((obj)=>{
        this.tableModel.model.push({
          index: idx,
          tableId: idx,
          rawId: obj.idHASH,
          subId: 0,
          inputId: this.getInputId(),
          name: obj.name,
          number: obj.children,
          ADD_TIME: obj.ADD_TIME,
          expand: false,
          sub: false,
          depth: 0,
          parent:{},
          isSaved:true,
          isSaving:false,
          isSavable: true,
          isNesting: false,
          isDuplicate: false,
        })
        idx++;
      })
    })
    .then(()=>{
      this.getChildrenNumAll()
      this.allHashLoaded = true;
    })
  }

  onRefreshHash(tgtRow) {
    this.hashServ.getHash(tgtRow.rawId)
    .then(data => {
      tgtRow.number = data[0].children;
      tgtRow.ADD_TIME= data[0].ADD_TIME;
    })
  }

  onExpand(tgtRow, callback?) {
    let idx = this.tableModel.model.indexOf(tgtRow)
    let parentRow
    if(tgtRow.parent !== {}) {
      parentRow = tgtRow.parent;
    }

    if(tgtRow.expand==false) {
      tgtRow.expand=true;
      this.hashServ.getHashSub(tgtRow.rawId)
      .then((data:Array<{}>) => {
          let id=0;
          data.map((obj:any) => {
            if(!/^#/.test(obj.text))  {
              //IF Just word.
              this.tableModel.model.splice(idx+1, 0, {
                index: -1,
                tableId: id,
                rawId: -1,
                subId: obj.idHASH_SUB,
                inputId:this.getInputId(),
                number: 1,
                name: obj.text,
                ADD_TIME: obj.ADD_TIME,
                expand: false,
                sub: true,
                parent: tgtRow,
                depth: tgtRow.depth+1,
                isSaved:true,
                isSaving:false,
                isSavable: true,
                isNesting: false,
                isDuplicate: false,
              })
            } else {
              //IF Sub Hash.
              let rawId
              this.hashServ.getHash(obj.idHASH_raw)
              .then(data=>{
                  let hashRow = {
                    index: -1,
                    tableId: id,
                    rawId: obj.idHASH_raw,
                    subId: obj.idHASH_SUB,
                    inputId:this.getInputId(),
                    number: 1,
                    name: obj.text,
                    ADD_TIME: obj.ADD_TIME,
                    expand: false,
                    sub: true,
                    parent: tgtRow,
                    depth: tgtRow.depth+1,
                    isSaved:true,
                    isSaving:false,
                    isSavable: true,
                    isNesting: false,
                    isDuplicate: false,
                  }
                  this.getChildrenNum(hashRow);
                  this.tableModel.model.splice(idx+1, 0, hashRow);
              })
            }
          id++;
          })
      })
      .then(()=>{
        this.reNumbering(this.tableModel.model)
        this.pagPerView += this.tableModel.model.filter((row)=>{
          return row.sub
        }).length
        if(callback) callback()
      })
    } else {
      tgtRow.expand=false;
      this.pagPerView -= this.tableModel.model.filter((row)=>{
        return row.sub
      }).length
      this.hashServ.getHashSub(tgtRow.rawId)
      .then((data:Array<{}>) => {
        this.deleteChilderen(tgtRow);
      })
      .then(()=>{
        this.reNumbering(this.tableModel.model)
        if(callback) callback()
      })
    }
  }

  deleteChilderen(tgtRow){
    let childRow = this.tableModel.model.filter((row)=>{
        return row.parent === tgtRow
    })
    tgtRow.isSaved =  true
    if(childRow !== []) {
      childRow.map((obj)=>{
        this.deleteChilderen(obj);
        let delIdx = this.tableModel.model.indexOf(obj)
        this.tableModel.model.splice(delIdx, 1);
      })
    }
  }


  addTag() {
    let lastIdx = this.tableModel.model.length;
    // console.log(lastIdx);
    let row = {
      index: lastIdx,
      tableId:lastIdx,
      subId: 0,
      rawId:-1,
      inputId: this.getInputId(),
      name:"",
      number: 0,
      ADD_TIME: '',
      expand: false,
      sub: false,
      parent: {},
      depth: 0,
      isSaved:false,
      isSaving:false,
      isSavable: false,
      isNesting: false,
      isDuplicate: false,
    }
    this.tableModel.model.push(row)
  }


  addChild(tgtRow, name?) {
    let id = tgtRow.tableId;
    // tgtRow.isSaved=true;
    tgtRow.isSavable = false;
    tgtRow.number += 1;
    let childRow = {
          index: -1,
          tableId: id+1,
          rawId: -1,
          subId: -1,
          inputId: this.getInputId(),
          number: 1,
          name: name ? name : "",
          ADD_TIME: "",
          expand: false,
          sub: true,
          parent: tgtRow,
          depth: tgtRow.depth+1,
          isSaved: false,
          isSaving:false,
          isSavable: false,
          isNesting: false,
          isDuplicate: false,
    }
    if(!tgtRow.expand) {
      this.onExpand(tgtRow, ()=>{ this.tableModel.model.splice(id+1, 0, childRow)});
    } else {
      this.tableModel.model.splice(id+1, 0, childRow);
    }
    return childRow;
  }

  addBro(tgtRow, name?) {
    let id = tgtRow.tableId;
    tgtRow.parent.isSaved=false;
    tgtRow.parent.isSavable = false;
    tgtRow.parent.number += 1;
    let broRow = {
      index: -1,
      tableId: id+1,
      rawId: -1,
      number: 1,
      subId: -1,
      inputId: this.getInputId(),
      name: name ? name : "",
      ADD_TIME: "",
      expand: false,
      sub: true,
      parent: tgtRow.parent,
      depth: tgtRow.depth,
      isSaved: false,
      isSaving:false,
      isSavable: false,
      isNesting: false,
      isDuplicate: false,
    }
    this.tableModel.model.splice(id+1, 0, broRow)
    // this.reNumbering(this.tableModel.model);
    return broRow;
  }

  getLastTableId(temp):number {
    return temp[temp.length-1].tableId;
  }

  removeRow(tgtRow) {
    let id = this.tableModel.model.indexOf(tgtRow)
    tgtRow.parent.number -= tgtRow.number;
    this.tableModel.model.splice(id, 1)
    if(tgtRow.isSaved) {
      if(!tgtRow.sub) {
        this.hashServ.deleteHash(tgtRow.rawId)
        .then(()=>{
          this.msgs = [];
          this.msgs.push({severity: 'success', summary:'태그 삭제 완료', detail: tgtRow.name +' 태그가 삭제되었습니다.'})
        })
        .catch(msg =>{
          this.msgs = [];
          this.msgs.push(msg);
        })
      } else {
        this.hashServ.deleteWord(tgtRow.parent.rawId, tgtRow.subId)
        .then(()=>{
          this.msgs = [];
          if(/^#/.test(tgtRow.name)) {
            this.msgs.push({severity: 'success', summary:'태그 삭제 완료', detail: tgtRow.name +' 태그가 삭제되었습니다.'})
          } else {
            this.msgs.push({severity: 'success', summary:'단어 삭제 완료', detail: tgtRow.name +' 단어가 삭제되었습니다.'})
          }
        })
        .catch(msg =>{
          this.msgs = [];
          this.msgs.push(msg);
        })
      }
    }
    this.deleteChilderen(tgtRow);
    // this.reNumbering(this.tableModel.model);
  }

  onHashUpdate(tgtRow, number) {
    this.isSaving = true;
    let data = new FormData();
    // data.append('children', tgtRow.number);
    data.append('name', tgtRow.name);
    this.hashServ.postHash(data)
  }

  onHashSave(tgtRow) {
    tgtRow.isSaving = true;
    let data = new FormData();

    let remChildRows = this.getChildRow(tgtRow).filter((obj)=>{ return !obj.isSaved && obj.name === "" })
    remChildRows.map((obj)=>{
      this.removeRow(obj);
    })

    data.append('children', tgtRow.number);
    let childRows = this.getChildRow(tgtRow).filter((obj)=>{ return !obj.isSaved && (obj.name !== "")})

    data.append('name', tgtRow.name);
    this.hashServ.postHash(data)
    .then(result =>{
      if(result.insertId !== 0) {
        tgtRow.rawId = result.insertId;
      }
    })
    .then(() =>{
      if(childRows.length !== 0) {
        childRows.map((obj)=>{
          this.onWordSave(obj);
        })
      } else {
        this.getChildrenNumAll();
        tgtRow.isSaving = false;
        tgtRow.isSaved = true;
      }
    })
    .then(()=>{
      this.msgs = [];
      if(/^#/.test(tgtRow.name)) {
          this.msgs.push({severity: 'success', summary:'태그 추가 완료', detail: tgtRow.name +' 태그가 추가되었습니다.'})
      } else {
        this.msgs.push({severity: 'success', summary:'단어 추가 완료', detail: tgtRow.name +' 단어가 추가되었습니다.'})
      }

      this.onExpand(tgtRow);
    })
    .catch(msg =>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }

  onWordSave(tgtRow) {
    this.isSaving = true;
    // console.log(tgtRow.name);
    let data = new FormData();
    // data.append('children', tgtRow.number);
    data.append('text', tgtRow.name);
    data.append('idHASH', tgtRow.parent.rawId.toString());
    // console.log(tgtRow.parent);
    if(tgtRow.rawId !== -1) data.append('idHASH_raw', tgtRow.rawId.toString());
    this.hashServ.postWord(data)
    .then(()=>{
      tgtRow.isSaved = true;
      this.msgs = [];
      this.msgs.push({severity: 'success', summary:'태그 추가 완료', detail: tgtRow.name +' 태그가 추가되었습니다.'})
      let broRows = this.getChildRow(tgtRow.parent).filter((obj)=>{ return !obj.isSaved })
      if(broRows.length === 0) {
        this.getChildrenNumAll();
        tgtRow.parent.isSaved = true;
        tgtRow.parent.isSaving = false;
      }
      tgtRow.isSaved = true;
    })
    .catch(msg =>{
      this.msgs = [];
      this.msgs.push(msg);
    })
  }

  getChildRow(tgtRow) {
    let childRow = this.tableModel.model.filter((obj)=>{
      return obj.parent == tgtRow;
    })
    return childRow;
  }

  reNumbering(data) {
    let idx = 0;
    // console.log(data);
    data.forEach((obj)=>{
      obj.tableId = idx;
      idx++;
    })
  }

  hashPaste(tgtRow, event) {
    let clipboardData = event.clipboardData.getData('Text');
    let wordList = clipboardData.split('\r\n')
    // wordList = wordList.splice(wordList.length, 1)
    let firstWord = wordList[0];
    // console.log(firstWord);
    tgtRow.name = "";
    wordList = wordList.sort()
    wordList.map((obj)=>{
        if(obj !==""&&obj !== firstWord) {
          if(tgtRow.sub) {
            this.checkValue(this.addBro(tgtRow, obj));
          } else {
            this.checkValue(this.addChild(tgtRow, obj));
          }
        }
    })
    setTimeout(()=>{
      tgtRow.name = firstWord;
      this.reNumbering(this.tableModel.model)
    }, 50)
  }

  openRow(tgtRow, event) {
    //Enter Key In
    if(event.keyCode == 13) {
      let inputId:string
      if(tgtRow.sub) {
        let broRow = this.addBro(tgtRow);
        inputId = broRow.inputId;
      } else {
        let childRow = this.addChild(tgtRow);
        inputId = childRow.inputId;
      }

      setTimeout(()=> {
        // console.log(document.getElementById(inputId));
        document.getElementById(inputId).focus();
      }, 100)
    }
  }


  checkValue(tgtRow) {
    if(/^#/.test(tgtRow.name)) {
      this.hashServ.getHashes()
      .then(data =>{
        let tgtData = data.filter((row)=>{ return row.name === tgtRow.name});
        // console.log(tgtData);
          if(tgtData[0]) {
              if(tgtRow.sub) tgtRow.rawId = tgtData[0].idHASH;
              tgtRow.ADD_TIME = tgtData[0].ADD_TIME;
          } else {
              tgtRow.number = 1;
              tgtRow.rawId = -1;
              tgtRow.ADD_TIME = "";
          }
      })
      .then(()=>{
        if(tgtRow.sub) this.chkChildrenNum(tgtRow);
      })
      .then(()=>{
        // if(tgtRow.sub) {
          this.getCheckNesting(tgtRow)
          .then(()=>{
            setTimeout(()=>{
              this.checkAllValid(tgtRow);
            }, 10)
          })
        // }
      })
    } else {
        setTimeout(()=>{
          this.checkAllValid(tgtRow);
        }, 10)
    }

  }


  checkAllValid(tgtRow) {
    this.getCheckDuplicate(tgtRow);
    let tgtInput = document.getElementById(tgtRow.inputId) as HTMLInputElement;
    tgtRow.isSavable = false;
    tgtRow.parent.isSavable = false;
    if (tgtInput.validity.patternMismatch) {
      this.msgs=[];
      if(tgtRow.sub) this.msgs.push({severity:'error', summary: tgtInput.validationMessage , detail:'공백 및 특수문자(#제외)를 제외한 2자-10자 사이의 단어를 입력해주세요.'})
      else this.msgs.push({severity:'error', summary: tgtInput.validationMessage , detail:' 공백 및 특수문자(#제외)를 제외한 #으로 시작하는 2자-10자 사이의 단어를 입력해주세요.'})
    } else if (tgtInput.validity.valueMissing) {
      this.msgs=[];
      this.msgs.push({severity:'error', summary:tgtInput.validationMessage, detail:''})
    } else if (tgtRow.isNesting) {
        this.msgs = [];
        this.msgs.push(
          {severity: 'error',
           summary:'입력에러 입니다.',
           detail: '부모 해쉬인 ' + tgtRow.name + '는' + tgtRow.parent.name + '의 자식해쉬가 될 수 없습니다.'}
        )
    } else if (tgtRow.isDuplicate) {
        this.msgs = [];
        this.msgs.push(
          {severity: 'error',
           summary:'입력에러 입니다.',
           detail: '중복된 해쉬태그 혹은 단어가 있습니다.'}
        )
    } else if(!tgtRow.parent.isSaved) {
        // this.msgs = [];
        // this.msgs.push(
        //   {severity: 'error',
        //    summary:'입력에러 입니다.',
        //    detail: '부모 태그를 먼저 저장해주세요.'}
        // )
        tgtRow.parent.isSavable = true;
    } else {
      tgtRow.isSavable = true;
      tgtRow.parent.isSavable = true;
    }
  }

  getCheckNesting(tgtRow) {
    return new Promise((resolve, reject)=>{
      this.hashServ.getHashSub(tgtRow.rawId)
      .then(data =>{
        let nestingRow = data.filter((row)=>{
          return (row.text == tgtRow.parent.name);
        })
        if(nestingRow.length !== 0 || tgtRow.name == tgtRow.parent.name) {
          tgtRow.isNesting = true;
          resolve(true);
        } else {
          tgtRow.isNesting = false;
          resolve(true);
        }
      })
    })
  }

  getCheckDuplicate(tgtRow) {
    if(tgtRow.sub) {
      let dupleRow= this.getChildRow(tgtRow.parent).filter((row)=>{
        return tgtRow.name === row.name
      })
      if(dupleRow.length > 1) {
        tgtRow.isDuplicate = true;
      } else {
        tgtRow.isDuplicate = false;
      }
    } else {
      let dupleRow= this.getTopRows().filter((row)=>{
        return tgtRow.name === row.name
      })
      console.log(dupleRow)
      if(dupleRow.length > 1) {
        tgtRow.isDuplicate = true;
      } else {
          tgtRow.isDuplicate = false;
      }
    }
  }

  getUpdateBros(tgtRow):number {
    let broNums = this.getChildRow(tgtRow).map((obj)=>{
      return obj.number
    })
    let broNum = broNums.reduce((prev, cu)=>{
      return prev + cu;
    })
    return broNum;
  }

  getInputId() {
    let value = Math.floor(Math.random()*10000);
    let inputTable=this.inputTable;
    // console.log(inputTable.indexOf(value));
    let result = 'i' + value.toString();
    if(inputTable.indexOf(result) !== -1) {
      return this.getInputId();
    } else {
      this.inputTable.push(result)
      return result;
    }
  }

  getChildrenNumAll() {
      this.tableModel.model.map((obj)=>{
        if(!obj.sub) {
          this.hashServ.getHashNum(obj.rawId)
          .then(data=>{
            obj.number = data[0]['count(idHASH)'];
          })
        }
      })
  }

  chkChildrenNum(tgtRow) {
      this.hashServ.getHashNum(tgtRow.rawId)
      .then(data=>{
        tgtRow.number = data[0]['count(idHASH)'];
        return tgtRow.number
      })
      .then(()=>{
        setTimeout(()=>{
          tgtRow.parent.number = this.getUpdateBros(tgtRow.parent);
        },100)
      })
  }

  getChildrenNum(tgtRow) {
    if(tgtRow.rawId !== -1) {
      this.hashServ.getHashNum(tgtRow.rawId)
      .then(data=>{
        tgtRow.number = data[0]['count(idHASH)'];
        return tgtRow.number
      })
    }
  }

  getTopRows() {
    let topRows = this.tableModel.model.filter((row)=>{
      return !row.sub
    })
    return topRows;
  }

  confirmDel(tgtRow) {
    let msg = ''
    if(/^#/.test(tgtRow.name)) {
      msg = tgtRow.name + ' 해시 태그를 정말 삭제하시겠습니까?'
    } else {
      msg = tgtRow.name + ' 단어를 정말 삭제하시겠습니까?'
    }
     this.confirm.confirm({
       message: msg,
       header: '삭제 확인',
       accept: () => {
         this.removeRow(tgtRow);
       },
     })
   }

  // onPageMove(event) {
  //   this.onSetPage(event.page + 1)
  // }

  // onPageMove(event) {
  //   this.tableModel.model = [];
  //   this.hashServ.getHashes(event.page + 1)
  //   .then(data => {
  //     let idx = 0
  //     data.map((obj)=>{
  //       this.tableModel.model.push({
  //         index: idx,
  //         tableId: idx,
  //         rawId: obj.idHASH,
  //         subId: 0,
  //         inputId:-1,
  //         name: obj.name,
  //         number: obj.children,
  //         ADD_TIME: obj.ADD_TIME,
  //         expand: false,
  //         sub: false,
  //         depth: 0,
  //         parent:{},
  //         isSaved:true,
  //         isSaving:false,
  //         isSavable: true,
  //       })
  //       idx++;
  //     })
  //   })
  //   .then(()=>{
  //     this.getChildrenNumAll()
  //     this.allHashLoaded = true;
  //   })
  //   // this.hashServ.getHashes(event.page+1)
  //   // .then((data)=>{
  //   //   this.tableModel.model = data
  //   // })
  //   // this.pagFirstIndex = (event.page)*10;
  //   // this.pagPerView =  (event.page*10)+10;
  // }
}
