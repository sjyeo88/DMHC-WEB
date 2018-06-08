import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-lecture-manual',
  templateUrl: './lecture-manual.component.html',
  styleUrls: ['./lecture-manual.component.scss']
})
export class LectureManualComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.lecture.title
    this.lay.cuTitle.page =  this.lay.submenus.lecture.menus[3];
    this.lay.currentMenu =  this.lay.submenus.lecture;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

}
