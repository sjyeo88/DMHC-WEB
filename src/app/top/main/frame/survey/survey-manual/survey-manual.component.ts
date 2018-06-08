import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-survey-manual',
  templateUrl: './survey-manual.component.html',
  styleUrls: ['./survey-manual.component.scss']
})
export class SurveyManualComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.survey.title
    this.lay.cuTitle.page =  this.lay.submenus.survey.menus[2];
    this.lay.currentMenu =  this.lay.submenus.survey;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

}
