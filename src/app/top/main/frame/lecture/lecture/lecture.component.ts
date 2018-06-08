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
import { NewLectureData, Lecture} from  '../new-lecture-data';
import * as Quill from 'quill/dist/quill'
import { Req2 } from './../../../../../ysjmodule/Req2';
import { ConfirmationService } from 'primeng/primeng'
import { LectureValidMsgs, LectureRegexValidators } from './../new-lecture.validator'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'
import { environment } from './../../../../../../environments/environment';

// PDF to HTML 3rd Party


// import { YQuill } from './../../../../../ysjmodule/yquill.module'

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
  providers: [ LectureValidMsgs ],
})
export class LectureComponent implements OnInit {

  public quill:any;
  public lectureModel:LectureModelHTML
  public isPDF: boolean = false;
  public htmlView:string = 'visible';
  public optWay: any[];
  public docWay: any[];

  public Debug:any;
  public pageHeight:any;
  public msgs: Message[] = [];
  public cuPageNum:number = this.ltr.defaultPageNum;
  public lectureId:number;
  public isTitle:boolean;
  public isAsTitle:boolean;
  public lastSelectedTitle:string;

  public lectures: Lecture[];
  public isLecturesLoaded:boolean;

  public saveAsDialogView:boolean;
  public loadDialogView:boolean;

  public lectureLoading:boolean;
  public isNew:boolean = true;
  // public asTitle:string = '';
  public cuTitle:string = '';

  public preViewer:boolean= false;

  public asTitleSub:Subscription;

  public fileSelected:boolean;
  public lecture_files:any[] = [];

  public pdfPage:number = 1;
  public pdfPageMax:number = 0;
  public pdfSrc = {
    url:'',
    withCredentials: true,
  }
  public isSaved:boolean ;
  public vmsg:LectureValidMsgs;

  constructor(
    public lay: Layout,
    public ltr:NewLectureData,
    public confirm:ConfirmationService,
    public sanitizer: DomSanitizer,
    public route: ActivatedRoute,
  ) {
    this.optWay = [
      {label:'직접작성', value: false},
      {label:'PDF업로드 (600px X 900px)', value: true}
    ]
    this.docWay= [
      {label:'새 심리교육', value: true},
      {label:'불러오기', value: false}
    ]

  }

  ngOnInit() {
    this.lay.asideView();
    this.lay.currentPage = this.lay.submenus.lecture.menus[1];
    this.lay.cuTitle.title = this.lay.submenus.lecture.title
    this.lay.cuTitle.page =  this.lay.submenus.lecture.menus[1];
    this.lay.currentMenu =  this.lay.submenus.lecture;

    this.lectureModel = new LectureModelHTML();
    this.vmsg = new LectureValidMsgs();
    this.matchLine();

    let fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = ['10px', '16px', '32px', '48px', '64px', '128px'];
    Quill.register(fontSizeStyle, true);

    this.getLecture()

    this.ltr.lectureForm.controls.asTitle.valueChanges
      .debounceTime(500)
      .subscribe(
        data => { this.onAsTitleChange(data) },
        () => {console.log('Finished')}
      );

    this.ltr.lectureForm.controls.page.valueChanges
      .subscribe(
        data => { this.changePage(data) },
        () => {console.log('Finished')}
    );

    this.ltr.lectureForm.controls.loadedTitle.valueChanges
      .pairwise()
      .subscribe(pair => {
        this.lastSelectedTitle = pair[0];
    })

    this.ltr.lectureForm.controls.title.valueChanges
      .debounceTime(500)
      .subscribe(
        data => {
          this.isSaved = false;
          this.pdfSrc.url = '';
          this.getLecture(()=>{
            this.lectures.map((obj)=>{
              if(obj.title === this.title.value) {
                this.isSaved=true;
              }
            })
          })
        },
        () => {console.log('Finished')}
      );

    if(this.route.snapshot.paramMap.get('isParam')) {
        let title = this.route.snapshot.paramMap.get('title')
        this.isNew = false;
        this.focusTitle()
        this.ltr.lectureForm.patchValue({loadedTitle: title})
        this.onLoad()
        // this.confirmLoad(null);
    }
  }

  matchLine() {
    setTimeout(()=>{
      let line1 = document.getElementsByClassName('line1')[0];
      let height = window.getComputedStyle(line1, null).getPropertyValue('height');
      this.pageHeight = height.replace('px', '');
    }, 10)
  }

  onWayChange() {
    this.Debug = this.isPDF;
    setTimeout(()=>{
      let line1 = document.getElementsByClassName('line1')[0];
      let height = window.getComputedStyle(line1, null).getPropertyValue('height');
      this.pageHeight = height.replace('px', '');

    }, 10)
  }

  onDocWayChange(eventlback) {
    if(!this.isNew) {
      this.title.reset();
    } else {
      this.loadedTitle.reset();
    }
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
      // console.log(this.lectureModel.pages.length)
      // console.log(this.ltr.lectureForm.value.page)
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
        // console.log(obj.html);
      }
    })
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

  getLecture(callback?):void {
    let http = new Req2('get', '/data/lectures/')
    http.send();
    http.Complete = ()=> {
      this.lectures= JSON.parse(http.response);
      // console.log(this.lectures);
      this.isLecturesLoaded = true
      if(callback) callback();
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  onTitleChange() {
    this.isTitle = false;
    let value = this.title.value;
    this.getLecture(()=>{
      this.lectures.map((obj)=>{
        if(obj.title === value ) {
          this.isTitle = true;
        }
      })
    })
  }

  onAsTitleChange(value) {
    this.isAsTitle = false;
    // console.log('Work')
    this.getLecture(()=>{
      this.lectures.map((obj)=>{
        if(obj.title === value ) {
          this.isAsTitle = true;
        }
      })
    })
  }

  focusTitle(callback?){
    if(!this.lectureLoading) {
      this.getLecture(()=>{
        this.lectureModel.titles=[];
        this.lectures.map((obj)=>{
          this.lectureModel.titles.push({value:obj.title, label:obj.title, id:obj.idLECTURE})
        })
        if(callback) callback();
      })
    }
    return null
  }

  onLoad() {
    this.loadDialogView = false;
    console.log('Works')
    this.getLecture(()=>{
    // console.log(this.lectures);
    this.lectures.map((obj)=>{
    if(obj.title === this.loadedTitle.value) {
    this.isPDF = (obj.type===1) ? true : false;
    this.onWayChange();
    // console.log(this.isPDF);
    if(!this.isPDF) {
      let formData = new FormData();
      this.lectureModel.titles.map((obj)=>{
        if(obj.value === this.loadedTitle.value) {
          const url:string = '/data/lecture/html/'+obj.id;
          let http = new Req2('get', url)
              http.send()
              http.Complete = ()=>{
                this.lectureModel.pages=[];
                JSON.parse(http.response).map((obj)=>{
                  this.lectureModel.pages.push({value:obj.page_no, label:'Page '+obj.page_no, html:obj.html})
                });
                setTimeout(()=>{
                  this.ltr.lectureForm.patchValue({page: 1});
                  this.changePage(1);
                  this.isSaved = true;
                }, 500)
              }
          }
        })
    } else {
      // if(this.isSaved) {
        console.log(this.isSaved);
        this.pdfPageMax = obj.page_no
        this.isSaved = true;
        this.msgs = [];
        this.msgs.push({severity: 'success',
        summary:'불러오기 완료',
        detail: this.loadedTitle.value+ ' 교육을 불러오기 하였습니다.'})
    }
  }})
  })
  }

  onLoadReject() {
    if(this.lastSelectedTitle) {
      this.ltr.lectureForm.patchValue({loadedTitle: this.lastSelectedTitle})
    } else {
      this.ltr.lectureForm.controls.loadedTitle.reset();
    }
    this.loadDialogView = false;
  }

 onSave(title?:string) {
    const url:string = '/data/lecture/html';
    const pageNum = this.lectureModel.pages.length
    let parser = new DOMParser()
    this.getLectureId((id)=>{
      this.lectureModel.pages.map((obj)=>{
        let formData = new FormData();
        let htmlElem = parser.parseFromString(obj.html, 'text/html').body
        // let htmlElem = document.getElementsByTagName('body')

        let http = new Req2('post', url, formData)
        if(title) {
          formData.append('title', title);
        } else {
          if(!this.isNew) {
            formData.append('title', this.ltr.lectureForm.value.loadedTitle);
          } else {
            formData.append('title', this.ltr.lectureForm.value.title);
          }
        }
        formData.append('html', obj.html);
        formData.append('all_page_no', pageNum.toString());
        formData.append('page_no', obj.value.toString());
        formData.append('lectureId', id);
        // console.log(htmlElem);
        // html2canvas(htmlElem)
        // .then(canvas =>{
        //   console.log(canvas.toDataURL());
        // })
        http.send(formData)
        http.Complete = () =>{
          this.isSaved = true;
          this.msgs = [];
          this.msgs.push({
          severity: 'success',
          summary: '페이지 저장 완료',
          detail: '모든 페이지가 저장되었습니다.'})
        }
        if(this.isNew && title) this.ltr.lectureForm.patchValue({title: title})
        if(!this.isNew && title) this.ltr.lectureForm.patchValue({loadedTitle: title})
        http.ServErr = () =>{ this.msgs.push(http.smsgs) }
        http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
      })
    })
 }


 getLectureId(callback) {
   let lectureId:number;
    this.lectures.map((obj)=>{
      if(this.isNew) {
        if(obj.title ===  this.ltr.lectureForm.value.title) lectureId = obj.idLECTURE;
      } else {
        if(obj.title ===  this.ltr.lectureForm.value.loadedTitle) lectureId = obj.idLECTURE;
      }
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
  let prefix = ""
  if(!this.title.valid && this.isNew) {
    this.msgs= [];
    this.msgs.push({severity: 'error',
      summary:'교육 이름 미입력',
      detail: '교육 이름을 먼저 입력해주세요.'
    })
    return false;
  }

  if(!this.loadedTitle.valid && !this.isNew) {
    this.msgs= [];
    this.msgs.push({severity: 'error',
      summary:'교육 이름 미선택',
      detail: '수정 할 교육을 먼저  선택해주세요.'
    })
    return false;
  }

  if(this.isTitle&&this.isNew)  {
    prefix = "동일한 이름을 가진 교육이 있습니다. "
  }
   this.confirm.confirm({
     message: prefix + '현재 교육을 저장하시겠습니까?',
     header: '저장 확인',
     accept: () => {
       if(!this.isPDF) this.onSave();
       else this.onPdfSave();
     },
   })
 }

 confirmLoad(event) {
   this.loadDialogView = true;
   // console.log(event);
 }

confirmSaveAs() {
  this.saveAsDialogView = true
  if(this.isNew) {
    this.ltr.lectureForm.patchValue({asTitle: this.title.value});
    // this.asTitle=  this.title.value;
    this.cuTitle=  this.asTitle.value;
  } else {
    this.ltr.lectureForm.patchValue({asTitle: this.loadedTitle.value});
    // this.asTitle =  this.loadedTitle.value;
    this.cuTitle=  this.asTitle.value;
  }
}

saveAs() {
  if(!this.isPDF) this.onSave(this.asTitle.value)
  else  this.onPdfSave(this.asTitle.value)
  this.saveAsDialogView = false;
}

viewPreViewer(cond:boolean) {
  if(this.loadedTitle.value == "" && this.title.value == "" ) {
    this.msgs= [];
    this.msgs.push({severity: 'error',
      summary:'교육 이름 미입력',
      detail: '교육 이름을 먼저 입력해주세요.'})
  } else {
    if(this.isSaved) {
      this.preViewer = cond;
      if(this.isPDF) {
        let url:string = environment.apiUrl + '/data/lecture/pdf/';
        this.pdfSrc.url = this.isNew ? url + this.title.value : url + this.loadedTitle.value
        console.log(this.pdfSrc);
      }
    } else {
        this.msgs = [];
        this.msgs.push({severity: 'error',
        summary:'미리보기',
        detail: '미리보기 전 저장해주세요.'})
    }
  }
}

//directon == true : Next, directon == Prev : Prev
movePreview(direction:boolean) {
  let page
  if((this.cuPageNum > 1 && !direction) ||
     (this.cuPageNum < this.lectureModel.pages.length && direction)) {
    this.cuPageNum = this.cuPageNum + (direction ? 1 : -1);
    this.ltr.lectureForm.patchValue({page: this.cuPageNum})
    this.msgs= [];
    this.msgs.push({severity: 'info', summary:'페이지', detail: this.cuPageNum + '번째 페이지입니다.'})
  } else {
    let prefix = direction ? '마지막' : '첫번째'
    this.msgs= [];
    this.msgs.push({severity: 'warn', summary:'페이지', detail: prefix + ' 페이지입니다.'})
  }
}

movePdfPreview(direction:boolean) {
  let page
  if((this.pdfPage > 1 && !direction) ||
     (this.pdfPage < this.pdfPageMax && direction)) {
    this.pdfPage = this.pdfPage + (direction ? 1 : -1);
    // this.ltr.lectureForm.patchValue({page: this.cuPageNum})
    this.msgs= [];
    this.msgs.push({severity: 'info', summary:'페이지', detail: this.pdfPage + '번째 페이지입니다.'})
  } else {
    let prefix = direction ? '마지막' : '첫번째'
    this.msgs= [];
    this.msgs.push({severity: 'warn', summary:'페이지', detail: prefix + ' 페이지입니다.'})
  }
}

  onUpload(event) {
      this.fileSelected = true;
      for(let file of event.files) {
          this.lecture_files.push(file);
      }
      this.onWayChange();
      // console.log(this.lecture_files);
      this.lecture_files = event.files; //To uploading file data.
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: '파일 선택 완료', detail: ''});
      this.matchLine();
  }

  onRemoved(event) {
    this.lecture_files.splice(this.lecture_files.indexOf(event.file), 1);
    this.matchLine();
  }

  public onPdfSave(title?) {
      const url:string = '/data/lecture/pdf' ;
      const formData = new FormData();
      this.msgs = [];
      if(this.lecture_files[0]) {
        let reader = new FileReader();
        let data= reader.readAsBinaryString(this.lecture_files[0]);
        reader.onloadend = () =>{
          let count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          // console.log(reader.result);
          this.pdfPageMax = count;
          formData.append('lecture_file', this.lecture_files[0], this.lecture_files[0].name);
          formData.append('all_page_no', count);
          let http = new Req2('post', url, formData)
          if(title) {
            formData.append('title', title);
          } else {
            if(!this.isNew) {
              formData.append('title', this.ltr.lectureForm.value.loadedTitle);
            } else {
              formData.append('title', this.ltr.lectureForm.value.title);
            }
          }
          http.send(formData)
          http.Complete = () =>{
            this.isSaved = true;
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              summary: '파일 저장 완료',
              detail: '저장되었습니다.'})
            this.focusTitle(()=>{
              if(this.isNew && title) this.ltr.lectureForm.patchValue({title: title})
              if(!this.isNew && title) this.ltr.lectureForm.patchValue({loadedTitle: title})
            })
          }
          http.ServErr = () =>{ this.msgs.push(http.smsgs) }
          http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
        }
      } else {
            this.msgs = [];
            this.msgs.push({
              severity: 'error',
              summary: '파일 선택.',
              detail: '저장할 파일이 없습니다.'})

      }
  }

  finishLecture() {
    if(this.isSaved) {
      this.getLectureId((id)=>{
        let http = new Req2('put', '/data/lecture/' + id)
        http.send();
        http.Complete = ()=> {
          this.lectures= JSON.parse(http.response);
          // console.log(this.lectures);
          this.isLecturesLoaded = true
          this.msgs = [];
          this.msgs.push({severity: 'success',
          summary:'작성 완료',
          detail: '해당 교육이 작성완료 처리 되었습니다.'})
        }
        http.ServErr = () =>{ this.msgs.push(http.smsgs) }
        http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
      })
    } else {
        this.msgs = [];
        this.msgs.push({severity: 'error',
        summary:'작성 완료 실패',
        detail: '교육 작성 완료 전 저장해주세요.'})
    }
  }



get editor() {
  return this.ltr.lectureForm.get('editor');
}

get title() {
  return this.ltr.lectureForm.get('title');
}
get loadedTitle() {
  return this.ltr.lectureForm.get('loadedTitle');
}
get asTitle() {
  return this.ltr.lectureForm.get('asTitle');
}

  ngOnDestroy() {}
}
