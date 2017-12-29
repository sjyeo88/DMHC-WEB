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
import { UserService } from '../../user.service';
import { Patient } from '../../patient.service';
import { Notice } from '../../notice.service';
import { Layout } from '../../layout.service';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {
  constructor(
    public userService: UserService,
    public patient: Patient,
    public notices: Notice,
    public lay: Layout,
  ) {
  }

  ngOnInit() {
    this.lay.asideHide();
    this.lay.currentPage = '';
  }

}
