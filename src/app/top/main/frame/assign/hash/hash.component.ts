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

import { Component, OnInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
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
  @ViewChildren('rowLabel') objInput: QueryList<ElementRef>

  public msgs:Message[] = [];
  public inputTable = [];
  public  hashTree;
  public  hashStruct;
  public inputDetect:boolean = false;
  public debounceObj:any;
  public hashSub = [];
  public rootNode = {
    origin:{

    }
  }


  constructor(
    public lay: Layout,
    public hashServ: HashService,
    public newHash: NewHashData,
    public el: ElementRef,
    public tableModel: Table,
    public confirm:ConfirmationService,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[3];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.makehashTree()

  }

  makehashTree() {
    let tree = [];
    Promise.all([this.hashServ.getHashSubs(), this.hashServ.getHashStruct(), []])
    .then(data=>{
      this.hashSub = (data[0] as object[]);
      this.hashStruct =  data[1];
      this.makeTree(data)
      return data;
    })
    .then(data=>{
      this.hashTree = data[2];
      this.setTreeToTable(this.hashTree);
      return data;
    })
    .then(data =>{
      // console.log(data);
    })
    // .then(data=>{
    //   this.searchTreeByModel(38, data[1])
    //   return data;
    // })
    .catch(msg=>{
      this.msgs = [];
      this.msgs.push(msg);
      console.log(msg);
    })
  }

  makeTree(data) {
    return new Promise(resolve=>{
      for(let i =0; i <= 2; i++) {
        this.getNodeFromModel(data[2], data[1], i);
      }
      resolve(data);
    })
  }

  getNodeFromModel(result, model, proc) {
    model.forEach((cu, idx )=>{
      let tgtNode = {
        key:cu.dece,
        name:cu.name,
        number:cu.count,
        time:cu.ADD_TIME,
        children: [],
        ADD_TIME: new Date()
      }
      tgtNode.children = this.getWords(tgtNode);
      if(cu.level === 0 && proc === 0) {
        result.push(tgtNode);
      } else if(cu.level === 1 && proc === 1){
        let dece = result.filter(obj=>{ return cu.dece === obj.key })[0];
        let ance = result.filter(obj=>{ return cu.ance === obj.key })[0];
        // dece.parent = ance;
        ance.children.splice(0, 0, dece);
      }
    }, [])
  }

  setTreeToTable(tree) {
    let table = this.tableModel.models;
    tree.forEach(obj=>{
      table.splice(table.length, 0, {
        origin:obj,
        view:{
          viewId:this.getNewViewId(),
          addNumber:0,
          parent:undefined,
          ances:[],
          errors:[],
          expand:false,
          isSaved:true,
          level:0,
          isSavable:true,
        }
      })
    })
  }

  getNewViewId() {
    let model = this.tableModel.models
    for(let i=0; i < model.length; i++) {
      if(model.every(obj => { return obj.view.viewId !== i })) {
        return i;
      }
    }
  }

  onExpand(item, idx, callback?) {
    let model = this.tableModel.models
    if(!item.view.expand) {
      item.view.expand = true;
      item.origin.children.sort((a, b)=>{
        return a.name > b.name ? -1 : a.name === b.name ? 0 : 1
      });
      item.origin.children.forEach(obj=>{
        let viewId = this.getNewViewId()
        model.splice(idx+1, 0,
          {
            origin:obj,
            view:{
              viewId: obj.key ? viewId : -1,
              parent:item,
              pattern:"[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}",
              ances:[item].concat(item.view.ances),
              addNumber:0,
              isSavable:true,
              expand:false, isSaved:true, level:item.view.level+1},
          });
      })
  } else {
      if(this.getChilds(item).some(obj=>{return !obj.view.isSaved})) {
        this.msgs = [];
        let msg = {
          severity:'error',
          summary:'저장되지 않은 항목이 있습니다.',
        }
        this.msgs.push(msg);
      } else {
        item.view.expand = false;
        model.filter(obj=>{
          return obj.view.ances.some(idx=>{ return idx === item })
        }).forEach(obj=>{
          model.splice(model.indexOf(obj), 1);
        })
      }
    }
    if(callback) callback();
  }

  getWords(parentNode) {
    return this.hashSub.filter(obj=>{
      return obj.idHASH === parentNode.key
    }).map(word =>{
        return {
          // parent:parentNode,
          key:undefined,
          name:word.text,
          number:1,
          ADD_TIME:word.ADD_TIME,
        }
    })
  }

  addCount(item) {
    item.origin.number++;
  }

  addTag() {
    let row =  {
      origin: {
        key:-2,
        name:'',
        number:0,
        children:[],
        ADD_TIME: new Date(),
      },
      view:{
        viewId: this.getNewViewId(),
        inputId: this.getInputId(),
        ances:[],
        errors:[],
        pattern:"[#][a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}",
        expand: false,
        isSaved: false,
        isSavable: false,
        isSaving: false,
        level: 0,
        addNumber:0,
      }
    }
    this.tableModel.models.push(row)
    setTimeout(()=>{ this.objInput.last.nativeElement.focus(); }, 10)
  }

  addChild(parentRow, idx, name?) {
    let childRow = {
      origin: {
        key:undefined,
        name: name ? name : '',
        number:1,
        ADD_TIME: new Date(),
        children:[],
      },
      view:{
        // viewId: this.getNewViewId(),
        inputId: this.getInputId(),
        viewId: -1,
        ances:[parentRow].concat(parentRow.view.ances),
        errors:[],
        expand: false,
        pattern:"[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}",
        isSaved: false,
        isSavable: false,
        isSaving: false,
        level: parentRow.view.level + 1,
        addNumber:0,
      }
    }
    if(!parentRow.view.expand) {
      this.onExpand(parentRow, idx, ()=>{
        this.tableModel.models.splice(idx+1, 0, childRow)
      })
    } else {
      this.tableModel.models.splice(idx+1, 0, childRow);
    }
    parentRow.view.addNumber++;
    parentRow.view.isSavable = false;
    setTimeout(()=>{
      let tgtInput = document.getElementById(childRow.view.inputId) as HTMLInputElement;
      tgtInput.focus();
    }, 10)
    return childRow;
  }

  addBro(broRow, idx, name?) {
    let newRow = {
      origin: {
        key:undefined,
        name: name ? name : '',
        number:1,
        ADD_TIME:new Date,
        children:[],
      },
      view:{
        viewId: -1,
        inputId: this.getInputId(),
        ances:broRow.view.ances,
        expand: false,
        errors:[],
        pattern:"[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}",
        isSaved: false,
        isSavable: false,
        isSaving: false,
        level: broRow.view.level,
        addNumber:0,
      }
    }
    this.tableModel.models.splice(idx+1, 0, newRow);
    setTimeout(()=>{
      let tgtInput = document.getElementById(newRow.view.inputId) as HTMLInputElement;
      tgtInput.focus();
    }, 10)
    return newRow;
  }

  checkValue(item, event?):Promise<boolean> {
    if(/^#/.test(item.origin.name)) {
      let hashOrigin;
      item.view.pattern = "[#][a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}";
      if(hashOrigin = this.checkOriginHash(item.origin.name)) {
        // console.log(hashOrigin);
        item.origin.children = hashOrigin.children;
        item.origin.number = hashOrigin.number;
        item.origin.key = hashOrigin.key;
        let parent = this.getParent(item);
        if(parent) {
          this.getParent(item).view.addNumber =
          this.getBros(item)
          .filter((obj)=>{ return !obj.view.isSaved })
          .reduce((prv, cu)=>{ return prv += cu.origin.number },  0)
        }
      } else {
        item.origin.key = -1;
        item.origin.children = [];
        item.origin.number = 0;
        let parent = this.getParent(item);
        if(parent) {
          this.getParent(item).view.addNumber =
          this.getBros(item)
          .filter((obj)=>{ return !obj.view.isSaved })
          .reduce((prv, cu)=>{ return prv += cu.origin.number },  0)
        }
      }
      return Promise.all([
        this.checkDuplicate(item),
        this.checkPattern(item),
        this.checkNested(item),
        this.checkChilds(item),
        this.checkExist(item),
      ])
      .then(values =>{
        item.view.errors = values
        if(!values[0] || !values[1] || !values[2] || !values[3] || !values[4]) {
          item.view.isSavable = false;
          return false
        } else {
          item.view.isSavable = true;
          return true
        }
      })
    } else {
      if(item.origin.key !== -2) {
        item.origin.key=undefined;
        item.origin.number=1;
        item.view.pattern = "[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}";
      }
      return Promise.all([this.checkDuplicate(item), this.checkPattern(item)])
      .then(values =>{
        // return values;
        item.view.errors = values
        if(!values[0] || !values[1]) {
          item.view.isSavable = false;
          return false;
        } else {
          item.view.isSavable = true;
          return true;
        }
      })
    }

    // if(event) { item.view.isSavable = event.srcElement.validity.valid; }

  }

  errorMsg(item) {
    let msg = [];
    let msgDup = { severity: 'error', summary: '저장불가', detail: '중복된 단어가 있습니다.' }
    let msgNesting = { severity: 'error', summary: '저장불가', detail: '올바른 포함관계가 아닙니다.' }
    let msgPattern1 = { severity: 'error', summary: '저장불가', detail: '입력이 잘못되었습니다. (1자-10자, #으로 시작해야합니다)' }
    let msgPattern2 = { severity: 'error', summary: '저장불가', detail: '입력이 잘못되었습니다. (1자-10자)'}
    if(!item.view.errors[0]) {
      msg.push(msgDup);
    }

    let msgChild = { severity: 'error', summary: '저장불가', detail: '하위 요소 저장에 오류가 있습니다.' }
    let msgExist = { severity: 'error', summary: '저장불가', detail: '해당 해시가 존재하지 않습니다.' }

    if(item.origin.key) {
      if(!item.view.errors[1]) {
        msg.push(msgPattern1) ;
      }
      if(!item.view.errors[2]) {
        msg.push(msgNesting) ;
      }
      if(!item.view.errors[3]) {
        msg.push(msgChild) ;
      }
      if(!item.view.errors[4]) {
        msg.push(msgExist) ;
      }
    } else {
      if(!item.view.errors[1]) {
        msg.push(msgPattern2) ;
      }
    }

    this.msgs = msg;
  }

  checkAll(item) {
    Promise.all(
      this.getBros(item)
      .filter(obj=>{ return obj && !obj.view.isSaved })
      .map(obj=>{
        return this.checkValue(obj)
      })
    )
    .then(values=>{
      let parent = this.getParent(item)
      if(parent && !parent.view.isSaved) {
          this.checkValue(this.getParent(item));
      }
      // console.log(values);
    })
  }

  checkAllWithDebounceTime(item) {
    if(!this.inputDetect) {
      this.inputDetect = true;
      this.debounceObj = setTimeout(()=>{
        this.checkAll(item);
        this.inputDetect = false;
      }, 300)
    } else {
      clearTimeout(this.debounceObj);
      this.debounceObj = setTimeout(()=>{
        this.checkAll(item);
        this.inputDetect = false;
      }, 300)
    }
  }

  checkDuplicate(item) {
    let table = this.tableModel.models
    return new Promise(resolve =>{
      let bros = this.getBros(item);
      if(bros.filter(obj=>{return  item.origin.name === obj.origin.name}).length > 1) {
        // console.log('Duplication error')
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }

  checkNested(item) {
    return new Promise(resolve =>{
      let parent = this.getParent(item);
      resolve(this.hashServ.getHashStruct()
      .then(data=>{
        if(item.view.ances.length === 0) {
          return true
        } else {
          if(data.filter(obj=>{ return (obj.ance === item.origin.key) })
          .some(obj=> { return obj.dece === parent.origin.key })) {
            // console.log('Nested error')
            return false;
          } else {
            if(item.origin.name === parent.origin.name) {
              return false;
            } else {
              return true;
            }
          }
        }
      }))
    })
  }

  checkPattern(item) {
    return new Promise(resolve =>{
      setTimeout(()=>{
        let tgtInput = document.getElementById(item.view.inputId) as HTMLInputElement;
        // if(!tgtInput.validity.valid) {console.log(tgtInput.validity)}
        resolve(tgtInput.validity.valid) }
        , 10)
    })
  }

  checkParent(item) {
    let parent = this.getParent(item)
    if(parent && !parent.view.isSaved) {
      if(this.getChilds(parent)
      // .filter(obj=>{ return !obj.view.isSaved })
      .some(obj=>{
        return !obj.view.isSavable && !obj.view.isSaved
      })) {
        // console.log('false');
        parent.view.isSavable = false
      } else {
        parent.view.isSavable = true;
      }
    }
  }

  checkChilds(item) {
    return new Promise(resolve=>{
      let childs = this.getChilds(item)
      if(childs.some(obj =>{
        return !obj.view.isSavable
      })) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }

  checkExist(item) {
    return new Promise(resolve=>{
      if(this.checkOriginHash(item.origin.name) || item.view.level === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  }

  getBros(item) {
    let table = this.tableModel.models
    return table.filter(obj=>{
      return obj.view.ances[0] === item.view.ances[0];
    })
  }

  getChilds(item) {
    let table = this.tableModel.models
    return table.filter(obj=>{
      return obj.view.ances[0] === item;
    })
  }

  getParent(item) {
    return item.view.ances[0]
  }

  openRow(item, idx, event) {
    //Enter Key In
    if(event.keyCode == 13) {
      let inputId:string
      if(item.origin.key && item.view.level === 0) {
        let childRow = this.addChild(item, idx);
      } else {
        let broRow = this.addBro(item, idx);
      }
    }
  }


  checkOriginHash(name) {
    return this.hashTree.filter(obj=>{ return obj.name === name })[0]
  }

  removeRow(item, idx) {
    let parent = this.getParent(item) ;
    let model = this.tableModel.models;
    if(parent) {
      if(item.view.isSaved) {
        if(item.origin.key) {
          //하위 요소, 저장됨, 해시
          this.delEqualHashWithSameParent(item)

          parent.origin.children.forEach((obj, idx, self) => {
            if(obj.key === item.origin.key) {
              self.splice(idx, 1);
            }
          })

          this.hashServ.deleteHashDecend(item.origin.key, parent.origin.key)
          .then(obj => {
            this.msgs = []
            this.msgs.push({severity:'success', summary: item.origin.name + ' 태그가 삭제되었습니다.'})
          })
          .catch(msg => {
            this.msgs = [];
            this.msgs.push(msg);
          })
        } else {
          //하위 요소, 저장됨, 단어
          this.delEqualWordWithSameParent(item);

          parent.origin.children.forEach((obj, idx, self) => {
            if(obj.name === item.origin.name) {
              self.splice(idx, 1);
            }
          })

          this.hashServ.deleteWord(parent.origin.key, item.origin.name)
          .then(obj => {
            this.msgs = []
            this.msgs.push({severity:'success', summary: item.origin.name + ' 단어가 삭제되었습니다.'})
          })
          .catch(msg => {
            this.msgs = [];
            this.msgs.push(msg);
          })
        }
      } else {
        //하위 요소, 저장안됨, 단어
        model.splice(idx, 1);
        parent.view.addNumber -= item.origin.number;
      }
    } else {
      if(item.view.isSaved) {
        if(item.origin.key) {
          //상위 요소, 저장됨, 해시
          this.delEqualHash(item)

          this.hashTree.forEach((obj, idx, self) => {
            // console.log(obj);
            if(obj.key === item.origin.key) { self.splice(idx, 1) }
            else {
              obj.children.forEach((oobj, iidx, sself) => {
                if(oobj.key === item.origin.key) {  sself.splice(iidx, 1) }
              })
            }
          })

          this.hashServ.deleteHash(item.origin.key)
          .then(obj => {
            this.msgs = []
            this.msgs.push({severity:'success', summary: item.origin.name + ' 태그가 삭제되었습니다.'})
          })
          .catch(msg => {
            this.msgs = [];
            this.msgs.push(msg);
          })

        }
      } else {
        if(item.origin.key) {
          //상위 요소, 저장안됨, 해시
          this.removeHashChildRow(item)
          model.splice(idx, 1);
        }
      }
    }

    this.checkAll(item);
    this.setHashCount();
  }

  removeHashChildRow(item) {
    item.view.expand = false;
    let model = this.tableModel.models;
    model.filter(obj=>{ return obj.view.ances.some(idx=>{ return idx === item }) })
      .forEach(obj=>{ model.splice(model.indexOf(obj), 1); })
  }

  delEqualHash(item) {
    let model = this.tableModel.models;
    return model.forEach((obj, idx ,self) =>{
      if(obj.origin.key === item.origin.key) {
        this.removeHashChildRow(obj);
        self.splice(idx, 1)
      }
    })
  }

  delEqualHashWithSameParent(item) {
    let model = this.tableModel.models;
    let parent = this.getParent(item) ;
    return model.forEach((obj, idx ,self) =>{
      if(this.getParent(obj) &&
        obj.origin.key === item.origin.key &&
        this.getParent(obj).origin.key === this.getParent(item).origin.key) {
        this.removeHashChildRow(obj);
        self.splice(idx, 1)
      }
    })
  }

  delEqualWordWithSameParent(item) {
    let model = this.tableModel.models;
    let parent = this.getParent(item) ;
    return model.forEach((obj, idx ,self) =>{
      if(this.getParent(obj) &&
        obj.origin.name === item.origin.name &&
        this.getParent(obj).origin.key === this.getParent(item).origin.key) {
        self.splice(idx, 1)
      }
    })
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

  onHashUpdate(item) {

    this.hashTree.push(item.origin);

    let data = new FormData();
    data.append('name', item.origin.name);
    data.append('ADD_TIME', item.origin.ADD_TIME.toISOString().slice(0, 19).replace('T', ' '));

    this.hashServ.postHash(data)
    .then(data=>{
      item.origin.key = data.insertId;
      this.hashTree.push(item.origin)
      this.hashStruct.push({
        ance:item.origin.key,
        dece:item.origin.key,
        level:0,
      })
      item.view.isSaved = true;
      return null;
    })
    .then(()=>{
      let childs = this.getChilds(item)
      let words = childs.filter(obj=>{ return !obj.origin.key })
      let hashes = childs.filter(obj=>{ return obj.origin.key })

      words.length > 0 ? this.onWordsUpdate(words) : null;
      hashes.length > 0 ? this.onHashesUpdate(hashes) : null;
    })
    .then(result=>{
      item.view.isSaved = true;
      item.view.isSaving = false;
    })
    .catch(msg =>{
        this.msgs = [];
        this.msgs.push(msg);
        console.log(msg);
    })
  }

  onWordsUpdate(words) {
    let data = new FormData();
    let parent = this.getParent(words[0])
    let item = words[0];

    if(!parent.view.isSaved) {
      // tgtRow.parent.isSavable = true;
      this.msgs = [];
      this.msgs.push(
        {severity: 'error',
         summary:'입력에러 입니다.',
         detail: '부모 태그를 먼저 저장해주세요.'}
      )
      return null;
    }

    words.forEach(obj => { this.addItemWithSameParent(obj) })
    let children=  words.map(obj=>{ return obj.origin })

    let body =  words.map(obj =>{
      parent.origin.children.push(obj.origin);
      return {
        text: obj.origin.name,
        ADD_TIME:obj.origin.ADD_TIME.toISOString().slice(0, 19).replace('T', ' '),
        idHASH: parent.origin.key
      }
    })

    data.append('words', JSON.stringify(body));

    return Promise.resolve(this.hashServ.postWords(data)
    .then(()=>{
      words.forEach(obj=>{obj.view.isSaved = true});
      this.msgs = [];
      this.msgs.push({severity: 'success', summary:'단어 추가 완료', detail: words.length +' 개의 단어가 추가되었습니다.'})

      parent.view.addNumber-= words.length;
      this.setHashCount()
      return true;
    })
    .catch(msg =>{
      this.msgs = [];
      this.msgs.push(msg);
      console.log(msg);
    }))

  }

  onHashesUpdate(hashes) {
    let item = hashes[0]
    let parent = this.getParent(item)
    if(!parent.view.isSaved) {
      // tgtRow.parent.isSavable = true;
      this.msgs.push(
        {severity: 'error',
         summary:'입력에러 입니다.',
         detail: '부모 태그를 먼저 저장해주세요.'}
      )
      return null;
    }


    hashes.forEach(obj => {
      this.addItemWithSameParent(obj)
      parent.origin.children.push(obj.origin)

      parent.view.addNumber -= obj.origin.number;

      let data = new FormData();
      data.append('dece', obj.origin.key);
      data.append('ance', parent.origin.key);
      data.append('ADD_TIME', obj.origin.ADD_TIME.toISOString().slice(0, 10).replace('T', ' '));
      this.hashServ.pushHash(data)
      .then(()=>{
        obj.view.isSaved = true;
        this.msgs.push({severity: 'success', summary:'태그 추가 완료', detail: item.origin.name +' 태그가 추가되었습니다.'})
      })
      .then(()=>{
        obj.view.isSavable = true;
        obj.view.isSaving = false;

        this.setHashCount();
      })
      .catch(msg =>{
        this.msgs = [];
        this.msgs.push(msg);
        console.log(msg);
      })
    })
  }


  addItemWithSameParent(item) {
    let model = this.tableModel.models;
    let parent = this.getParent(item) ;
    return model.forEach((obj, idx ,self) =>{
      if(obj.origin.key === parent.origin.key && obj.view.expand && obj !== parent) {
        self.splice(idx+1, 0,
          { origin:item.origin,
            view:{
              viewId: item.origin.key ?  this.getNewViewId() : -1,
              pattern:"[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{1,10}",
              ances: [obj].concat(obj.view.ances),
              addNumber:0,
              isSavable:true,
              expand:false,
              isSaved:true,
              level: obj.view.level+1
            },
        })
      }
    })
  }

  hashPaste(item, idx,event) {
    let clipboardData = event.clipboardData.getData('Text');
    let wordList = clipboardData.split('\r\n')
    wordList = wordList.filter(obj=>{return obj !=="" })
    let firstWord = wordList[0];
    wordList.splice(0, 1);
    // wordList.sort();
    wordList.reverse();
    wordList.map((obj)=>{
      if(!item.origin.key) {
        // this.checkValue(this.addBro(item, idx,obj));
        this.addBro(item, idx,obj);
      } else {
        // tgtRow.isSavable = true;
        this.addChild(item, idx,obj);
      }
    })
    setTimeout(()=>{
      item.origin.name = firstWord;
      this.getChilds(item).forEach(obj=>{
        this.checkValue(obj);
      });
    }, 50)
    setTimeout(()=>{
      this.checkValue(item);
    }, 1000)
  }



  getHashCount(item) {
    let tgtObj = item.origin ? item.origin : item;
    if(!tgtObj.children) {console.log(item)};
    return tgtObj.children.reduce((prev, cu)=>{
      prev += cu.number;
      return prev;
    }, 0)
  }

  getAncesterHashes(item) {
    let key = item.origin.key;
    return Promise.resolve(
      this.hashServ.getHashStruct()
      .then(struct=>{
        let anceStruct = struct.filter(obj=>{ return obj.dece === key && obj.dece !== obj.ance })
        return anceStruct.reduce((prev, cu)=>{
          return prev.concat( this.hashTree.filter(origin=> { return origin.key === cu.ance })
        );
        }, [])
      })
    )
  }

  setHashCount() {
    // item.origin.number = this.getHashCount(item);
    let model = this.tableModel.models
    model.filter(obj=>{ return obj.origin.key })
    .forEach(obj=>{ obj.origin.number = this.getHashCount(obj); })
  }

  test(item) {
    console.log(item);
  }

}
