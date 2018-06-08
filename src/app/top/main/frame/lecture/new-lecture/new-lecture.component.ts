import { Component, OnInit } from '@angular/core';
import { Layout } from './../../../../layout.service';
import { NewLectureData, Lecture} from  '../new-lecture-data';
import { ConfirmationService } from 'primeng/primeng'
import { LectureValidMsgs, LectureRegexValidators } from './../new-lecture.validator'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'
import { LectureComponent } from '../lecture/lecture.component'
import { LectureModelHTML, LectureModelPDF } from '../lecture.model'
import { LectureService } from '../lecture.service'
import * as Quill from 'quill/dist/quill'

@Component({
  selector: 'app-new-lecture',
  templateUrl: './../lecture/lecture.component.html',
  styleUrls: ['./../lecture/lecture.component.scss'],
  providers: [ NewLectureData ],
})
export class NewLectureComponent extends LectureComponent {

  constructor(
    public lay: Layout,
    public ltr:NewLectureData,
    public confirm:ConfirmationService,
    public sanitizer: DomSanitizer,
    public route: ActivatedRoute,
  ) {
    super(lay, ltr, confirm, sanitizer, route)
    this.isNew = true;
  }

  ngOnInit() {
    this.lay.asideView();
    this.lectureModel = new LectureModelHTML();
    this.vmsg = new LectureValidMsgs();
    this.lay.currentPage = this.lay.submenus.lecture.menus[1];
    this.lay.cuTitle.title = this.lay.submenus.lecture.title
    this.lay.cuTitle.page =  this.lay.submenus.lecture.menus[1];
    this.lay.currentMenu =  this.lay.submenus.lecture;
        setTimeout(()=>{
      let line1 = document.getElementsByClassName('line1')[0];
      let height = window.getComputedStyle(line1, null).getPropertyValue('height');
      this.pageHeight = height.replace('px', '');
    }, 10)

    let fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = ['10px', '16px', '32px', '48px', '64px', '128px'];
    Quill.register(fontSizeStyle, true);

    this.getLecture()

    // const asTitle$ = Observable.from(this.asTitle)
    // this.asTitleSub = asTitle$

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
        console.log(title)
        this.isNew = false;
        this.focusTitle()
        this.ltr.lectureForm.patchValue({loadedTitle: title})
        this.onLoad()
        // this.confirmLoad(null);
    }
  }

}
