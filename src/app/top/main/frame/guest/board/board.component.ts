// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : board                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Layout } from './../../../../layout.service';
import { NoticeService } from '../notice.service';
import { BoardForm } from './board.form';
import { ConfirmationService } from 'primeng/primeng'
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [ NoticeService, BoardForm ]
})
export class BoardComponent implements OnInit {
  tgtBoardId = this.route.snapshot.paramMap.get('idNOTICE')
  msgs: Message[] = [];
  boardAll = [];
  boardAllByPage = [];
  isAdmin:boolean = false;
  adminName:string = '';
  isEdit:boolean = false;
  rowPerPage:number = 15;
  cuPage:number = 0;

  constructor(
    public lay:Layout,
    public serv:NoticeService,
    public fm:BoardForm,
    public confirm:ConfirmationService,
    public route:ActivatedRoute,
  ) {
    this.name.valueChanges
    .debounceTime(500)
    .subscribe(data=>{
      if(data !== "") {
        this.searchBoard();
      } else {
        this.getBoardList();
      }
    })
  }

  ngOnInit() {
    this.lay.cuTitle.title = this.lay.submenus.guest.title
    this.lay.cuTitle.page =  this.lay.submenus.guest.menus[0];
    this.lay.currentMenu =  this.lay.submenus.guest;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.checkAdmin();
    this.getBoardList();
  }

  public getBoardList() {
    this.boardAll = [];
    this.serv.getBoards()
    .then(data =>{
      data.forEach(obj=>{
        this.boardAll.push({
          no: obj.idNOTICE,
          title: obj.title,
          author: obj.author,
          date: obj.UPDATE_TIME,
          expand: false,
        })
        this.boardAll.push({
          text : obj.text,
        });
      })
    })
    .then(()=>{
      this.onPageMove(this.cuPage);
    })
    .then(()=>{
      this.viewDetail();
    })
  }

  public onExpand(item) {
    item.expand = item.expand ? false : true;
  }



  public onPageMove(page) {
    this.cuPage = page;
    let beginNum = 2*this.rowPerPage*page;
    let endNum = 2*this.rowPerPage*(page+1);
    this.boardAllByPage = this.boardAll.slice(beginNum, endNum);
  }

  public checkAdmin() {
    this.serv.chkAdmin()
    .then(data=>{
      if (data.length !== 0) {
        console.log(data);
        this.isAdmin = true;
        this.adminName = data[0].name;
      }
    })
  }

  public newBoard() {
    this.onEditCancle();
    this.title.patchValue('');
    this.text.patchValue('');
    this.isEdit = this.isEdit ? false : true;
  }

  public getDate() {
    return new Date();
  }

  public postBoard() {
    let data = new FormData();
    console.log(this.text.value);
    data.append('title', this.title.value);
    data.append('text',
     this.text.value
     .replace(new RegExp('\n|\r', 'g'), '<br />')
   );
    data.append('author', this.adminName);
    this.serv.postBoard(data)
    .then(()=>{
      this.isEdit = false;
      this.getBoardList()
      this.onPageMove(this.cuPage);
    })
  }

  searchBoard() {
    switch(this.option.value) {
      case 0:
        this.serv.getBoardsByTitle(this.name.value)
        .then(data => {
          this.boardAll = [];
          data.forEach(obj=>{
            this.boardAll.push({
              no: obj.idNOTICE,
              title: obj.title,
              author: obj.author,
              date: obj.UPDATE_TIME,
              expand: false,
            })
            this.boardAll.push({
              text : obj.text,
            });
          });
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
      case 1:
        this.serv.getBoardsByDetail(this.name.value)
        .then(data => {
          this.boardAll = [];
          data.forEach(obj=>{
            this.boardAll.push({
              no: obj.idNOTICE,
              title: obj.title,
              author: obj.author,
              date: obj.UPDATE_TIME,
              expand: false,
            })
            this.boardAll.push({
              text : obj.text,
            });
          });
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
    }
  }

  public onEdit(item, idx) {
    this.title.patchValue(item.title);
    this.text.patchValue(
      this.boardAll[idx+1].text
     .replace(new RegExp('<br />', 'g'), '\n')
    );
    this.isEdit = true;
  }

  public onEditCancle() {
    this.title.patchValue('');
    this.text.patchValue('');
    this.isEdit = false;
  }

  public onDelBoard(idBoard) {
    this.serv.delBoard(idBoard)
    .then(()=>{
      this.getBoardList()
    })
  }

  confirmDel(item, idx) {
     this.confirm.confirm({
       message: item.title + ' 항목을 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.onDelBoard(item.no)
       },
     })
  }


  public viewDetail() {
    if(this.tgtBoardId) {
      this.boardAllByPage.filter(obj=>{
        return obj.no == this.tgtBoardId
      })[0].expand = true;
    }
  }



  get title() {
    return this.fm.boardForm.get('title')
  }
  get text() {
    return this.fm.boardForm.get('text')
  }
  get name() {
    return this.fm.searchForm.get('name')
  }
  get option() {
    return this.fm.searchForm.get('option')
  }
}
