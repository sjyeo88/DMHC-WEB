// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class Layout {

  public cuTitle = {
    title: '',
    page: '',
  };
  public submenus = {
    dmhc: {title: '매일마음관리',
      menus: ['매일마음관리', '이용절차', '이용약관'],
      urls:   ['', '', '', ],
    },
    lecture: {title: '심리교육 설정',
      menus:  ['전체 교육 정보보기', '새 심리교육 생성하기', '기존교육 수정하기', '심리교육설정 메뉴얼'],
      urls:   ['./main/frame/lecture/all', './main/frame/lecture/new', '', ''],
      // urls:   ['./', './main/frame/lecture_new', './', './'],
    },
    survey:  {title: '설문지 설정',
      menus: ['새 설문지 작성하기', '기존 설문지 수정하기', '설문지 설정 메뉴얼'],
      urls:   ['./main/frame/survey/new', './main/frame/survey/edit', '', ],
    },
    assign: {title: '내담자 과제설정',
      menus:  ['전체 과제 정보보기', '새 과제 생성하기', '기존 과제 수정하기', 'Hash Tag 설정하기'],
      urls:   ['', './main/frame/assign/new', '', './main/frame/assign/hash',],
    },
    manage: {title: '내담자 관리',
      menus:  ['전체 내담자 정보관리', '특정 내담자 정보보기', '내담자 관리 메뉴얼'],
      urls:   ['', '', '', ],
    },
    mypage:  {title: 'My Page',
      menus: ['내 정보 수정하기'],
      urls:   ['', ],
    },
    guest:  {title: '고객센터',
      menus: ['공지사항', '자주하는 질문', '서비스 이용문의'],
      urls:   ['', '', '',],
    }
  }
  public currentMenu = {title:'', menus: [], urls: []};
  public currentPage = '';


  public values = {
    aside_width: "0",
    aside_padding: "0",
    transform: 'translate(-120%)',
    // transform: 'translateX(0px)'
  };

  public animation(property, from:number, to:number, unit:string, ) {
    let value = from;
    let interval = setInterval(()=>{
      if(from < to) value++;
      else if(from > to) value--;
      this.values['aside_width'] = value.toString() + unit;
      if(value == to) clearInterval(interval)
    }, 5)
  }

  public translateX_ani(property, from:number, to:number, unit:string, ) {
    let value = from;
    this.cuTitle[0] = this.submenus.lecture.title,
    this.cuTitle[1] = this.submenus.lecture.menus[1];
    let interval = setInterval(()=>{
      if(from < to) value = value+5;
      else if(from > to) value = value-5;
      this.values['transform'] =  "translateX(" + value.toString() + unit +")";
      if(value == to) clearInterval(interval)
    }, 0)
  }

  public asideView() {
    this.translateX_ani('transform', -120, 0, '%');
  }
  public asideHide() {
    if(this.values['transform'] ===  "translateX(0%)") {
      this.translateX_ani('transform', 0, -120, '%');
    }
  }
}
