// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : faq                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Layout } from './../../../../layout.service';
import { FaqService } from '../faq.service';
import { BoardForm } from '../board/board.form';
import { ConfirmationService } from 'primeng/primeng'

@Component({
  selector: 'app-faq',
  templateUrl: '../board/board.component.html',
  styleUrls: ['../board/board.component.scss'],
  providers: [FaqService, BoardForm]
})
export class FaqComponent extends BoardComponent {
  constructor(
    public lay:Layout,
    public serv:FaqService,
    public fm:BoardForm,
    public confirm:ConfirmationService,
    public route:ActivatedRoute,
  ) {
    super(lay, serv, fm, confirm, route)
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
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.guest.title
    this.lay.cuTitle.page =  this.lay.submenus.guest.menus[1];
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
          no: obj.idFAQ,
          title: obj.title,
          author: obj.author,
          date: obj.UPDATE_TIME,
        })
        this.boardAll.push({
          text : obj.text,
          expand: false,
        });
      })
    })
    .then(()=>{
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
              no: obj.idFAQ,
              title: obj.title,
              author: obj.author,
              date: obj.UPDATE_TIME,
            })
            this.boardAll.push({
              text : obj.text,
              expand: false,
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
              no: obj.idFAQ,
              title: obj.title,
              author: obj.author,
              date: obj.UPDATE_TIME,
            })
            this.boardAll.push({
              text : obj.text,
              expand: false,
            });
          });
        })
        .then(()=>{
          this.onPageMove(0)
        })
      break;
    }
  }
}
