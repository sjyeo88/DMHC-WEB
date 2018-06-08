import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-assign-manual',
  templateUrl: './assign-manual.component.html',
  styleUrls: ['./assign-manual.component.scss']
})
export class AssignManualComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.assign.title
    this.lay.cuTitle.page =  this.lay.submenus.assign.menus[4];
    this.lay.currentMenu =  this.lay.submenus.assign;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

}
