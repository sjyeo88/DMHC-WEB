// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : assign                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Layout } from './../../../../layout.service';
import { AssignForm } from './assign.form';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  // @ViewChildren('focusInput') objInput: QueryList<ElementRef>

  constructor(
    public lay:Layout,
    public fm:AssignForm
  ) { }
  public expand = "none";
  public expandClass = "assign-obj-hidden"
  public grid_gap= 0
  public height='115px';
  public testOption= [
    {label: '1111', value:0},
    {label: '2222', value:1},
  ]

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[1];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;
    // this.assigns.insert(1, JSON.stringify(this.fm.assignGroup)) );
  }

  // ngAfterViewChecked() {
  //   this.cdr.detectChanges();
  // }


  expandAssign(item, i) {
    if (!item.controls.expand.value) {
      item.patchValue({'expand': true});
    }
    else {
      item.patchValue({'expand': false});
    }
  }

  createFormCtrl(idx, item) {
    this.fm.createFormControl(idx, item);
  }

  test(value){
    console.log(value)
  }

  get assigns() {
    return this.fm.assignForm.get('assigns') as FormArray;
  }
}
