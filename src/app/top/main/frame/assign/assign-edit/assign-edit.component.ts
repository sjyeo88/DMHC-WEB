// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : assign-edit                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AssignComponent } from '../assign/assign.component';
import { Layout } from './../../../../layout.service';
import { AssignEditForm } from './assign-edit.form';
import { ConfirmationService } from 'primeng/primeng'
import { AssignService } from '../assign.service';
import { DropDownOpt, Options } from '../assign.model';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-assign-edit',
  templateUrl: '../assign/assign.component.html',
  styleUrls: ['../assign/assign.component.scss'],
  providers: [AssignService, Options],
})

export class AssignEditComponent extends AssignComponent {

  public assignList:DropDownOpt[]=[];
  constructor(
    lay:Layout,
    as:AssignService,
    fm:AssignEditForm,
    confirm: ConfirmationService,
    opt: Options,
    public route: ActivatedRoute,
  ) {
    super(lay, as, fm, confirm, opt)
    this.isNew = false;

  }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[2];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;

    this.getLecture();
    this.getAssignFinished();
    this.getAssignList();
    this.getSurvey();

    if(this.route.snapshot.paramMap.get('isParam')) {
        let title = this.route.snapshot.paramMap.get('idSBJT_CONF_ALL')
        setTimeout(()=>{
          this.title.patchValue(title)
          this.loadAssign(title);
        }, 500);
    }
  }


  public loadAssign(idSBJT_CONF_ALL) {
    this.as.getAssignAll(idSBJT_CONF_ALL)
    .then(data =>{
      let addNum = data.length - this.assigns.length
      this.fm.assignForm.get('lecture').patchValue(data[0].idLECTURE);
      new Promise((resolve)=>{
        for(let i=0; i < Math.abs(addNum); i++) {
          if(addNum < 0) {
            this.assigns.removeAt(this.assigns.length-1);
          } else if(addNum) {
            this.fm.addAssign();
          }
        }
        resolve(this.assigns);
      })
      .then(assigns=>{
        data.forEach((obj, idx)=>{
          let item = this.assigns.controls[idx];
          this.assigns.controls[idx].patchValue({
            'subTitle': obj.title,
            'command': obj.command,
          })
          this.assigns.controls[idx].get('create').patchValue({
            'type': obj.type_create_condition,
            'byDate': obj.conf_create_condition_01,
            'byNum': obj.conf_create_condition_02,
          })
          this.assigns.controls[idx].get('create').get('byNoAndAssign').patchValue({
            'byNum': obj.conf_create_condition_03,
            'byAssign': obj.conf_create_condition_04,
          })
          this.assigns.controls[idx].get('prod').patchValue({
            'type': obj.type_create_num,
            'byNum': obj.conf_create_num_01,
            'byWeekDate': JSON.parse(obj.conf_create_num_02),
            'byDate': obj.conf_create_num_03,
          })
          this.assigns.controls[idx].get('input').patchValue({
            'type': obj.type_input,
            'photo': (obj.conf_input_01==1) ? true : false,
            'num': obj.conf_input_02,
            'time': obj.conf_input_03,
            'survey': obj.conf_input_05,
          })
          this.fm.setTableData(item, JSON.parse(obj.conf_input_04));
          this.assigns.controls[idx].get('push').get('times').patchValue({
            'fromTime': new Date(obj.conf_push_time_01),
            'toTime': new Date(obj.conf_push_time_02),
          })

          this.assigns.controls[idx].get('push').patchValue({
            'push_type': obj.type_repush_time,
            'time': obj.conf_repush_time_01,
          })

          this.assigns.controls[idx].get('del').patchValue({
            'del_type': obj.type_del,
            'byNum': obj.conf_del_01,
            'byDate': obj.conf_del_02,
          })

          this.assigns.controls[idx].get('stop').patchValue({
            'stop_type': obj.type_stop,
            'byDate': obj.conf_stop_01,
            'byNum': obj.conf_stop_02,
          })

          this.fm.createFormControl({value: obj.type_create_condition}, item);
          this.fm.prodFormControl({value: obj.type_create_num}, item);
          this.fm.inputFormControl({value: obj.type_input}, item);
          this.fm.pushFormControl(item);
          this.fm.delFormControl(item);
          this.fm.stopFormControl(item);
        });
      })
      .then(()=>{
        this.idSBJT_CONF_ALL = idSBJT_CONF_ALL;
      })
    })
  }

}
