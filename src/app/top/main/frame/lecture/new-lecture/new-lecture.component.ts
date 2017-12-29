// ################################################################## //
// #  COPYRIGHT © KU 마음건강연구소 ALL RIGHTS RESERVED.             # //
// #  Name of app: DMHC (Web applcation of Daily Mind Health Care). # //
// #  Client : KU Mind health care institute.                       # //
// #  Developer : Yeo Sung Jun (sjyeo88@gmail.com).                 # //
// #  Used Frameworks : Angular 4, Express, MySQL.                  # //
// #  Name of Component : new-lecture                               # //
// #  Kick off : 2017-12-04                                         # //
// #  End day  : 2017-01-31                                         # //
// ################################################################## //

import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { LectureModelHTML, LectureModelPDF } from '../lecture.model'
import { NewLectureData } from  '../new-lecture-data';
import * as Quill from 'quill/dist/quill'
import { Req2 } from './../../../../../service/get-public-data.service';
import { ConfirmationService } from 'primeng/primeng'

// import { YQuill } from './../../../../../ysjmodule/yquill.module'

@Component({
  selector: 'app-new-lecture',
  templateUrl: './new-lecture.component.html',
  styleUrls: ['./new-lecture.component.scss'],
  providers: [ NewLectureData ],
})
export class NewLectureComponent implements OnInit {

  public quill:any;
  public lectureModel:LectureModelHTML
  public isPDF: boolean = false;
  public htmlView:string = 'visible';
  public optWay: any[];
  public Debug:any;
  public pageHeight:any;
  public msgs: Message[] = [];
  public cuPageNum:number = this.ltr.defaultPageNum;
  public lectureId:number;
  public saveAsDialogView:boolean;

  public lectures:any[];
  public isLecturesLoaded:boolean;

  constructor(
    public lay: Layout,
    public ltr:NewLectureData,
    public confirm:ConfirmationService,
  ) {
    this.optWay = [
      {label:'직접작성', value: false},
      {label:'PDF업로드 (600px X 900px)', value: true}
    ]
  }

  ngOnInit() {
    this.lay.asideView();
    sessionStorage.setItem('title', this.lay.submenus.lecture.title);
    sessionStorage.setItem('page', this.lay.submenus.lecture.menus[1]);
    this.lay.currentPage = this.lay.submenus.lecture.menus[1];

    this.lectureModel = new LectureModelHTML();
    setTimeout(()=>{
      let line1 = document.getElementsByClassName('line1')[0];
      let height = window.getComputedStyle(line1, null).getPropertyValue('height');
      this.pageHeight = height.replace('px', '');
    }, 10)

    let fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = ['10px', '16px', '32px', '48px', '64px', '128px'];
    Quill.register(fontSizeStyle, true);

    this.getLecture()
  }

  onWayChange(eventlback) {
    this.Debug = this.isPDF;
    setTimeout(()=>{
      let line1 = document.getElementsByClassName('line1')[0];
      let height = window.getComputedStyle(line1, null).getPropertyValue('height');
      this.pageHeight = height.replace('px', '');
    }, 10)
  }

  addPage(){
    let addPage = this.lectureModel.addPage()
    this.msgs = [];
    this.msgs.push({severity: 'success', summary:'페이지 추가 완료', detail: addPage +' 번째 페이지가 추가되었습니다.'})
    this.quill.container.firstChild.innerHTML = '';
    this.ltr.lectureForm.patchValue({page: addPage});
  }

  delPage(){
    let removedPage = this.lectureModel.delPage(this.cuPageNum, (number)=>{
      this.msgs = [];
      this.msgs.push({severity: 'success', summary:'삭제 완료', detail: number + '번째 페이지가 삭제되었습니다.'});
      console.log(this.lectureModel.pages.length)
      console.log(this.ltr.lectureForm.value.page)
      if(this.lectureModel.pages.length <= this.ltr.lectureForm.value.page) {
        this.ltr.lectureForm.patchValue({page: this.lectureModel.pages.length});
        this.changePage(this.lectureModel.pages.length)
      } else {
        this.changePage(number);
      }
        // this.ltr.lectureForm.patchValue({page: number-1});
      // if(this.lectureModel.pages.length < this.ltr.lectureForm.value.page)
    })
    if(this.lectureModel.pages.length===1) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary:'마지막 페이지', detail:'마지막 페이지는 지울 수 없습니다.'});
    }
  }

  changePage(value) {
    this.cuPageNum = value
    this.lectureModel.pages.map((obj)=>{
      // if(obj.value === this.cuPageNum) this.ltr.controls.['editor'].patchValue(obj.html);
      if(obj.value === this.cuPageNum) {
        this.quill.container.firstChild.innerHTML = obj.html;
        console.log(obj.html);
      }
    })
  }

  savePage() {
    this.lectureModel.pages.map((obj)=>{
      if(obj.value === this.cuPageNum) obj.html = this.quill.container.firstChild.innerHTML;
    })
    console.log(this.lectureModel.pages);
  }

  quickSavePage(content){
    this.lectureModel.pages[this.cuPageNum-1].html = this.quill.container.firstChild.innerHTML;
  }

  insertPage() {
    let insPage = this.lectureModel.insertPage(this.cuPageNum)
    this.msgs = [];
    this.msgs.push({severity: 'success', summary:'페이지 삽입 완료', detail: insPage +' 번째 페이지가 추가되었습니다.'})
    this.quill.container.firstChild.innerHTML = '';
    this.ltr.lectureForm.patchValue({page: insPage});
  }

  editorCreated(event) {
    this.quill = event;
  }

  get editor() {
    //username === 'username' function 명 Model명 똑같아야 함.
    return this.ltr.lectureForm.get('editor');
  }

  getLecture():void {
    let http = new Req2('get', '/data/lectures/')
    http.send();
    http.Complete = ()=> {
      this.lectures= JSON.parse(http.response);
      console.log(this.lectures);
      this.isLecturesLoaded = true
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

 onSave() {
    const url:string = '/data/lecture/html';
    const pageNum = this.lectureModel.pages.length
    this.getLectureId((id)=>{
      this.lectureModel.pages.map((obj)=>{
        let formData = new FormData();
        let http = new Req2('post', url, formData)
        formData.append('title', this.ltr.lectureForm.value.title);
        formData.append('html', obj.html);
        formData.append('all_page_no', pageNum.toString());
        formData.append('page_no', obj.value.toString());
        formData.append('lectureId', id);
        http.send(formData)
        http.Complete = () =>{
          this.msgs = [];
          this.msgs.push({
          severity: 'success',
          summary: '페이지 저장 완료',
          detail: '모든 페이지가 저장되었습니다.'})
        }
        http.ServErr = () =>{ this.msgs.push(http.smsgs) }
        http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
      })
    })
 }

 getLectureId(callback) {
   let lectureId:number;
    this.lectures.map((obj)=>{
      if(obj.title ===  this.ltr.lectureForm.value.title)
        lectureId = obj.idLECTURE;
    })
    callback(lectureId)
 }

 confirmDel() {
   this.confirm.confirm({
     message: '현재 페이지를 정말 삭제하시겠습니까?',
     header: '삭제 확인',
     accept: () => {
       this.delPage();
     },
   })
 }
confirmSave() {
   this.confirm.confirm({
     message: '현재 교육을 저장하시겠습니까?',
     header: '저장 확인',
     accept: () => {
       this.onSave();
     },
   })
 }

confirmSaveAs() {
  this.saveAsDialogView = true
}


  ngOnDestroy() {
    sessionStorage.removeItem('title');
    sessionStorage.removeItem('page');
  }


}
