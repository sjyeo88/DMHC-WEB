import { Injectable } from '@angular/core'


@Injectable()
export class Layout {
  public isSlide:boolean = false;
  public cuTitle = {
    title: '',
    page: '',
  };
  public submenus = {
    sitemap: {title: '사이트 맵',
      menus: ['사이트 맵'],
      urls:   ['/sitemap'],
    },
    dmhc: {title: '매일마음관리',
      menus: ['매일마음관리 소개', '이용절차', '이용약관'],
      urls:   ['', '/dmhc/process',  '', ],
    },
    lecture: {title: '심리교육 설정',
      menus:  ['전체 교육 정보보기', '새 심리교육 생성하기', '기존교육 수정하기', '심리교육설정 메뉴얼'],
      urls:   ['/lecture/all', '/lecture/new', '/lecture/edit', ''],
    },
    survey:  {title: '설문지 설정',
      menus: ['새 설문지 작성하기', '기존 설문지 수정하기', '설문지 설정 메뉴얼'],
      urls:   ['/survey/new', '/survey/edit', '', ],
    },
    assign: {title: '내담자 과제설정',
      menus:  ['전체 과제 정보보기', '새 과제 생성하기', '기존 과제 수정하기', 'Hash Tag 설정하기'],
      urls:   ['/assign/all', '/assign/new', '/assign/edit', '/assign/hash',],
    },
    manage: {title: '내담자 관리',
      menus:  ['전체 내담자 정보관리', '특정 내담자 정보보기', '내담자 관리 메뉴얼'],
      urls:   ['/manage/all', '/manage/detail', '', ],
    },
    mypage:  {title: 'My Page',
      menus: ['내 정보 수정하기'],
      urls:   ['/mypage/user', ],
    },
    guest:  {title: '고객센터',
      menus: ['공지사항', '자주하는 질문', '서비스 이용문의'],
      urls:   ['/guest/notice', '/guest/faq', '/guest/qna',],
    }
  }
  public currentMenu = {title:'', menus: [], urls: []};
  public currentPage = '';


  public values = {
    aside_width: "0",
    aside_padding: "0",
  };


  public asideView() {
    this.isSlide = false;
    setTimeout(()=>{
      this.isSlide = true;
    }
    ,10)
  }
  public asideHide() {
    this.isSlide = false;
  }
}
