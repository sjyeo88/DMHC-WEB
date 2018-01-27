import {Injectable } from '@angular/core'
import {FormGroup, FormBuilder } from '@angular/forms'

@Injectable()
export class ManageAllForm {
  form:FormGroup;
  public searchOpt = [
    { label:'이름으로 검색', value:0, },
    { label:'과제 그룹으로 검색', value:1, },
  ]
  constructor(
    public fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      searchOpt:[0],
      search:[''],
    })
  }

}
