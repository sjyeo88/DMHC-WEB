// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : expire                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-expire',
  templateUrl: './expire.component.html',
  styleUrls: ['./expire.component.scss']
})
export class ExpireComponent implements OnInit {

  public sec = 3;
  public watch;


  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.watch = setInterval(()=>{
      this.sec--;
      if(this.sec == 0) {
        clearInterval(this.watch);
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    }, 1000)
  }

}
