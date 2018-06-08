import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.dmhc.title
    this.lay.cuTitle.page =  this.lay.submenus.dmhc.menus[0];
    this.lay.currentMenu =  this.lay.submenus.dmhc;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

}
