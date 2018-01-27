
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core'
@Injectable()
export class QnaForm {
  form:FormGroup;
  constructor(
    public fb:FormBuilder,
  ) {
    this.form = this.fb.group({
      title: ['', [ Validators.required ]],
      editor : ['', [ Validators.required ]],
    })
  }
}
