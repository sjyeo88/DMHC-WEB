import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-manage-manual',
  templateUrl: './manage-manual.component.html',
  styleUrls: ['./manage-manual.component.scss']
})
export class ManageManualComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.manage.title
    this.lay.cuTitle.page =  this.lay.submenus.manage.menus[2];
    this.lay.currentMenu =  this.lay.submenus.manage;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

}
