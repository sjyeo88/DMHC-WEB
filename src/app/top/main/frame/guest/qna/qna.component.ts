// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : qna                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { QnaForm } from './qna.form'
import { QnaService } from '../qna.service'
import * as Quill from 'quill/dist/quill'
import { environment } from './../../../../../../environments/environment';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.scss'],
  providers: [ QnaForm, QnaService ],
})
export class QnaComponent implements OnInit {

  // imgRegExp = new RegExp("<img[^>]*src=[\"']?([^>\"']*(?:base64)+[^>\"']+)[\"']?[^>]*>")
  imgRegExp = /<img[^>]*src=[\"']?([^>\"']*(?:base64)+[^>\"']+)[\"']?[^>]*>/;
  // imgSrcExp = new RegExp("src=[\"']?([^>\"']*(?:base64)+[^>\"']+)[\"']?[^>]")
  constructor(
    public lay:Layout,
    public fm:QnaForm,
    public serv:QnaService,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.guest.title
    this.lay.cuTitle.page =  this.lay.submenus.guest.menus[2];
    this.lay.currentMenu =  this.lay.submenus.guest;
    this.lay.currentPage = this.lay.cuTitle.page;

    let fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = ['10px', '16px', '32px', '48px', '64px', '128px'];
    Quill.register(fontSizeStyle, true);

    this.editor.valueChanges
    .debounceTime(500)
    .subscribe(data =>{
      if(this.imgRegExp.test(data)) {
        let img = this.imgRegExp.exec(data)[1]
        let imgdata = new FormData();
        imgdata.append('img', img)
        this.serv.postImg(imgdata)
        .then(fileName=>{
          this.editor.patchValue(
          data.replace(this.imgRegExp, '<img src="' + environment.apiUrl + '/img/tmp/' + fileName + '"')
          )
        })
      }
    })
  }

  submit() {
    let data = new FormData();
    data.append('title', this.title.value);
    data.append('text', this.editor.value);

    this.serv.postDetail(data);
  }

  get title() {
    return this.fm.form.get('title');
  }
  get editor() {
    return this.fm.form.get('editor');
  }
}
