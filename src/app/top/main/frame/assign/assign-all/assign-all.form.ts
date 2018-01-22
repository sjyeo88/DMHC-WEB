import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core'

@Injectable()
export class AssignAllForm {
  searchForm: FormGroup;
  searchOpt = [
    {value: 0, label:  '과제 그룹이름으로 검색'},
    {value: 1, label:  '교육 이름으로 검색'},
    {value: 2, label:  '과제명으로 검색'},
    {value: 3, label:  '제시문으로 검색'},
  ]
  constructor(
    public fb: FormBuilder
  ) {
    this.searchForm= this.fb.group({
          option: [0, []],
          name: ['', []],
    })
  }
}
