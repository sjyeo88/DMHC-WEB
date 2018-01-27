// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : use-process                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';

@Component({
  selector: 'app-use-process',
  templateUrl: './use-process.component.html',
  styleUrls: ['./use-process.component.scss']
})
export class UseProcessComponent implements OnInit {

  constructor(
    public lay:Layout,
  ) { }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.dmhc.title
    this.lay.cuTitle.page =  this.lay.submenus.dmhc.menus[1];
    this.lay.currentMenu =  this.lay.submenus.dmhc;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

  processOpt = [
    {
      title: '치료자 등록',
      detail: '매일마음관리 홈페이지에서 치료자 등록 신청을 합니다.',
      appendix: '전문가 자격증 사본 필요',
    },
    {
      title: '등록비 입금',
      detail: '하기 계좌로 등록비를 입금합니다.',
      appendix: 'XX은행 : XXX-XXXX-XXXX<br>등록비용 : \\ XXXX',
    },
    {
      title: '치료자 등록',
      detail: '등록완료 메일을 확인합니다.(약 ~ 시간 소요)',
      // appendix: '약 ~ 시간 소요',
    },
    {
      title: '앱 소개',
      detail: '내담자에 매일마음관리 모바일 어플리케이션을 소개 후 어플 내에서 '
              + '담당 선생님을 등록요청 합니다.',
      appendix: '',
    },
    {
      title: '앱 소개',
      detail: '매일 마음관리 관리자 페이지에서 내담자의 어플리케이션을 이용한 과제'
              + ' 수행 및 설문 결과를 관리합니다.',
      appendix: '',
    },
  ]

}
