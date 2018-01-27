// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : sitemap                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Layout } from './../../../layout.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {

  public sitemap = this.lay.submenus
  constructor(
    public lay:Layout,
    public router:Router,
    public route:ActivatedRoute,
  ) {
    this.lay.cuTitle.title = this.lay.submenus.sitemap.title
    this.lay.cuTitle.page =  this.lay.submenus.sitemap.menus[0];
  }

  ngOnInit() {
  }

  onRoutePage(url){
    console.log(url);
    this.router.navigate(url, {relativeTo: this.route})
  }

}
