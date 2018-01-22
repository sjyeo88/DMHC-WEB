// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : assign-new                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { AssignComponent } from '../assign/assign.component';
import { Layout } from './../../../../layout.service';
import { AssignNewForm } from './assign-new.form';
import { ConfirmationService } from 'primeng/primeng'
import { AssignService } from '../assign.service';
import { Options } from '../assign.model';

@Component({
  selector: 'app-assign-edit',
  templateUrl: '../assign/assign.component.html',
  styleUrls: ['../assign/assign.component.scss'],
  providers: [AssignService, Options],
})
export class AssignNewComponent extends AssignComponent {

  constructor(
    lay:Layout,
    as:AssignService,
    fm:AssignNewForm,
    confirm: ConfirmationService,
    opt: Options,
  ) {
    super(lay, as, fm, confirm, opt)
    this.isNew = true;
  }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[1];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;
    // this.assigns.insert(1, JSON.stringify(this.fm.assignGroup)) );

    this.getLecture();
    this.getAssignFinished();
    this.getSurvey();

    this.title.valueChanges
    .debounceTime(500)
    .subscribe(title=>{
      this.as.getAssignList()
      .then(data=>{
        if(data.some((value)=>{ return value.title == title })) {
          this.isDuplicated=true;
        } else {
          this.isDuplicated=false;
        }
      })
    })
  }

}
