// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : shortcut                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Layout } from '../../layout.service';
import { ShortcutService } from './shortcut.service'
import { UserService } from '../../user.service'

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [ ShortcutService ]
})
export class ShortcutComponent implements OnInit {
  public userServ = {
      name: '',
      dept: '',
      job: '',
      loginDate:new Date(),
  }
  public notices = []
  constructor(
    public lay: Layout,
    public serv: ShortcutService,
    public us: UserService,
  ) {
    this.getNotice();
  }

  ngOnInit() {
    this.lay.asideHide();
    this.lay.currentPage = '';
  }



  public getNotice() {
    this.serv.getNotices()
    .then(data=>{
      this.notices = data.slice(0, 7)
    })
  }

}
