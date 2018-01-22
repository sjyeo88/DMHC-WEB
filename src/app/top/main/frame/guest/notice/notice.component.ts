// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : notice                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Layout } from './../../../../layout.service';
import { NoticeService } from '../notice.service';
import { BoardForm } from '../board/board.form';
import { ConfirmationService } from 'primeng/primeng'

@Component({
  selector: 'app-faq',
  templateUrl: '../board/board.component.html',
  styleUrls: ['../board/board.component.scss'],
  providers: [NoticeService, BoardForm]
})
export class NoticeComponent extends BoardComponent {
  constructor(
    public lay:Layout,
    public serv:NoticeService,
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
    this.lay.cuTitle.title = this.lay.submenus.guest.title
    this.lay.cuTitle.page =  this.lay.submenus.guest.menus[0];
    this.lay.currentMenu =  this.lay.submenus.guest;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.checkAdmin();
    this.getBoardList();
  }

}
