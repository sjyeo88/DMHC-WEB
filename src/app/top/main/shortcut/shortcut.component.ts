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

import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { Layout } from '../../layout.service';
import { AppServices } from './../../../service/app.services';
import { AppModels } from './../../../service/app.models';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [],
})
export class ShortcutComponent implements OnInit, AfterViewInit  {
  public notices = []
  public urNPatient:number = 0;
  public NPatient:number = 0;
  constructor(
    public lay: Layout,
    // public serv: ShortcutService,
    public ref: ChangeDetectorRef,
    public serv: AppServices,
    public model: AppModels,
  ) {
    this.getNotice();
    this.getUnregistedPatient();
    this.getPatient();
  }

  ngOnInit() {
    console.log(this.model.user)
    this.lay.asideHide();
    this.lay.currentPage = '';
  }

  ngAfterViewInit() {
    this.ref.detectChanges();
  }

  public getNotice() {
    this.serv.getNotices()
    .then(data=>{
      this.notices = data.slice(0, 7)
    })
  }

  public getUnregistedPatient() {
    this.serv.getUnregistedPatient()
    .then(data=>{
      this.urNPatient = data[0].count;
    })
  }

  public getPatient() {
    this.serv.getPatient()
    .then(data=>{
      this.NPatient = data[0].count;
    })
   }
}
