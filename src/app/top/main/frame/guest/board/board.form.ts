
import { AbstractControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core'
@Injectable()
export class BoardForm {
  boardSearchOption = [
    {value: 0, label:'제목으로 검색'},
    {value: 1, label:'내용으로 검색'},
  ]
  boardForm: FormGroup;
  searchForm: FormGroup;
  constructor(
    public fb: FormBuilder,
  ) {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    })

    this.searchForm = this.fb.group({
      option: [0, []],
      name: ['', []],
    })
  }
}
