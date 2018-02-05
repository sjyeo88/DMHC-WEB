// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : all-lecture                    # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { ConfirmationService } from 'primeng/primeng'
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { AllLectureModel } from './all-lecture.model';
import { Req2 } from './../../../../../ysjmodule/Req2';
import { NewLectureData, Lecture} from  '../new-lecture-data';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-all-lecture',
  templateUrl: './all-lecture.component.html',
  styleUrls: ['./all-lecture.component.scss'],
  providers: [AllLectureModel]
})

export class AllLectureComponent implements OnInit {
  public msgs: Message[] = [];
  public lectures: Lecture[];
  public allLectures: Lecture[];
  public searchForm:FormGroup;
  public maxPage:number;
  public allLecturesLoaded:boolean;
  public lecturesLoaded:boolean;
  public isSearch:boolean;
  public pagFirstIndex:number=1;
  public cuPage:number=1;
  public titleSortStatus:number = 0; //0=Normal, 1=Acending, 2=Decending
  public statusSortStatus:number = 0; //0=Normal, 1=Acending, 2=Decending
  public dateSortStatus:number = 0; //0=Normal, 1=Acending, 2=Decending
  public titleSortChar:string = ''; //0=Normal, 1=Acending, 2=Decending
  public statusSortChar:string = ''; //0=Normal, 1=Acending, 2=Decending
  public dateSortChar:string = ''; //0=Normal, 1=Acending, 2=Decending

  constructor(
    public lay: Layout,
    public confirm:ConfirmationService,
    public model:AllLectureModel,
    public fb:FormBuilder,
    public ltr:NewLectureData,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.getLecture(1);
    this.getLecture(null);
    this.searchForm= this.fb.group({
          name: ['', [ ]],
    })
    this.searchForm.controls.name.valueChanges
    .debounceTime(500)
    .subscribe(data=>{
      if(data !== "") {
        this.searchLecture(data);
        this.isSearch = true;
      } else {
        this.getLecture(1);
        this.getLecture();
        this.isSearch = false;
      }
      console.log(data);
    })

  }

  ngOnInit() {
    this.lay.asideView();
    this.lay.cuTitle.title = this.lay.submenus.lecture.title
    this.lay.cuTitle.page =  this.lay.submenus.lecture.menus[0];
    this.lay.currentMenu =  this.lay.submenus.lecture;
    this.lay.currentPage = this.lay.cuTitle.page;
  }

  getLecture(page?, callback?):void {
    let http = page ?
      new Req2('get', '/data/lectures/' + page) :
      new Req2('get', '/data/lectures')
    http.send();
    http.Complete = ()=> {
      if(page) {
        this.lectures= JSON.parse(http.response);
        console.log(this.lectures);
        this.lecturesLoaded = true;
      }
      else {
        this.allLectures= JSON.parse(http.response);
        this.allLecturesLoaded = true;
      }
      // console.log(this.lectures);
      if(callback) callback();
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  searchLecture(title, callback?):void {
    let http = new Req2('get', '/data/lectures/title/' + title)
    http.send();
    http.Complete = ()=> {
        this.lectures= JSON.parse(http.response);
        this.allLectures = this.lectures;
      // console.log(this.lectures);
      if(callback) callback();
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  removeItem(id, title) {
    let http = new Req2('DELETE', '/data/lecture/' + id)
    http.send();
    http.Complete = ()=> {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary:'교육 삭제 완료', detail: title + ' 교육이 삭제되었습니다.'})
      this.onSetPage(this.cuPage);
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

   confirmDel(id, title) {
     this.confirm.confirm({
       message: title+ ' 교육을 정말 삭제하시겠습니까?',
       header: '삭제 확인',
       accept: () => {
         this.removeItem(id, title);
       },
     })
   }

  onPageMove(event) {
    this.onSetPage(event.page + 1)
  }

  onSetPage(page) {
    this.getLecture(page, ()=>{
      this.pagFirstIndex=(15*page-14);
      this.cuPage = page;
    });
    this.getLecture(null)
  }

  onEditMove(title, type) {
    // this.ltr.lectureForm.patchValue({title: title})
    this.router.navigate(['../new', {isParam: true, title: title}], {relativeTo: this.route});
  }

  onSortList(method) {
    switch(method) {
      case 0:
        if(this.titleSortStatus === 0) {
          this.lectures.sort(this.compareTitleAcend);
          this.titleSortStatus = 1;
          this.titleSortChar = "▼"
          this.statusSortChar = ""
          this.dateSortChar = ""
        } else if(this.titleSortStatus === 1) {
          this.lectures.sort(this.compareTitleDcend);
          this.titleSortStatus = 2;
          this.titleSortChar = "▲"
          this.statusSortChar = ""
        } else if(this.titleSortStatus === 2) {
          this.getLecture(this.cuPage);
          this.titleSortStatus = 0;
          this.titleSortChar = ""
        }
        break
      case 1:
        console.log('Work');
        if(this.statusSortStatus === 0) {
          this.lectures.sort(this.compareStatusAcend);
          this.statusSortStatus = 1;
          this.statusSortChar = "  ▼"
          this.titleSortChar = ""
          this.dateSortChar = ""
        } else if(this.statusSortStatus === 1) {
          this.lectures.sort(this.compareStatusDcend);
          this.statusSortStatus = 2;
          this.statusSortChar = "  ▲"
          this.titleSortChar = ""
          this.dateSortChar = ""
        } else if(this.statusSortStatus === 2) {
          this.getLecture(this.cuPage);
          this.statusSortStatus = 0;
          this.statusSortChar = ""
        }
        break
      case 2:
        if(this.dateSortStatus === 0) {
          this.lectures.sort(this.compareDateAcend);
          this.dateSortStatus = 1;
          this.dateSortChar = "  ▼"
          this.titleSortChar = ""
          this.statusSortChar = ""
        } else if(this.dateSortStatus === 1) {
          this.lectures.sort(this.compareDateDcend);
          this.dateSortStatus = 2;
          this.dateSortChar = "  ▲"
          this.titleSortChar = ""
          this.statusSortChar = ""
        } else if(this.dateSortStatus === 2) {
          this.getLecture(this.cuPage);
          this.dateSortStatus = 0;
          this.dateSortChar = ""
        }
        break
    }
  }

  compareTitleAcend(a, b) {
      return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 :
             ((a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 0)
  }

  compareTitleDcend(a, b) {
      return (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 :
             ((a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 0)
  }

  compareStatusAcend(a, b) {
      return (a.status> b.status) ? 1 :
             ((a.status< b.status) ? -1 : 0)
  }

  compareStatusDcend(a, b) {
      return (a.status < b.status) ? 1 :
             ((a.status > b.status) ? -1 : 0)
  }

  compareDateAcend(a, b) {
      return (a.UPDATE_TIME.toLowerCase() > b.UPDATE_TIME.toLowerCase()) ? 1 :
             ((a.UPDATE_TIME.toLowerCase() < b.UPDATE_TIME.toLowerCase()) ? -1 : 0)
  }

  compareDateDcend(a, b) {
      return (a.UPDATE_TIME.toLowerCase() < b.UPDATE_TIME.toLowerCase()) ? 1 :
             ((a.UPDATE_TIME.toLowerCase() > b.UPDATE_TIME.toLowerCase()) ? -1 : 0)
  }


  get name(){
    return this.searchForm.get('name');
  }

}
