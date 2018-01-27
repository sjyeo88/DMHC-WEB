
// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : confirm                                   # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Req2 } from '../../service/get-public-data.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm-job.component.html',
  styleUrls: ['./confirm-job.component.scss']
})
export class ConfirmJobComponent implements OnInit, OnDestroy {

  userId:number;
  userName:string;
  isDataLoaded:boolean;
  msgs:any[];
  private sub: any;
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.userId = +params['userId'];
          // console.log(this.userId)
          let http = new Req2('get', ('/data/users/' + this.userId.toString()))
          http.send();
          http.Complete = ()=> {
            // console.log(typeof http.response)
            // console.log(http.response)
            this.userName = JSON.parse(http.response)[0].name;
            this.isDataLoaded= true;
          }
          http.ServErr = () =>{ this.msgs.push(http.smsgs) }
          http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
      })
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
