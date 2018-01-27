// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : aside                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Layout } from '../layout.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(
    public lay:Layout,
    private router: Router,
    public ref:ChangeDetectorRef,
    public route: ActivatedRoute,
  ) {


  }

  ngOnInit() {
    if(sessionStorage.getItem('title') && sessionStorage.getItem('page'))
      {
        Object.keys(this.lay.submenus).map((obj)=>{
          if(this.lay.submenus[obj].title == sessionStorage.getItem('title')) {
            this.lay.currentMenu = this.lay.submenus[obj];
          }
        this.lay.currentPage =  sessionStorage.getItem('page');
        })
    }
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
    //for avoid ExpressionChangedAfterItHasBeenCheckedError
  }
}
