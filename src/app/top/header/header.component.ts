// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : header                                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Layout } from '../layout.service';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public msgs: Message[] = [];
  constructor(
    public lay: Layout,
    public us:UserService,
    public router:Router,
  ) { }

  ngOnInit() {

  }

  public menuSlide(menuNum:number) {
    this.lay.asideView()
    switch(menuNum) {
      case 0:
        this.lay.currentMenu = this.lay.submenus.dmhc;
        break;
      case 1:
        this.lay.currentMenu = this.lay.submenus.lecture;
        break;
      case 2:
        this.lay.currentMenu = this.lay.submenus.survey;
        break;
      case 3:
        this.lay.currentMenu = this.lay.submenus.assign;
        break;
      case 4:
        this.lay.currentMenu = this.lay.submenus.manage;
        break;
      case 5:
        this.lay.currentMenu = this.lay.submenus.mypage;
        break;
      case 6:
        this.lay.currentMenu = this.lay.submenus.guest;
        break;
    }
  }

  public menuLeave() {
    // this.lay.translateX_ani('transform', 0, -120, '%');
    // this.lay.animation('aside_width', 20, 0, '%')
    // this.lay.animation('aside_padding', 14, 0, 'px')
  }
  public logOut() {
    this.us.delSession()
    .then(()=>{
      this.us.isLogedIn = false;
      this.router.navigate(['/']);
    })
  }


}
