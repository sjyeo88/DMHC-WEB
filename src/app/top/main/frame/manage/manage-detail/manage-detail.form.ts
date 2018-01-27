import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Injectable()
export class ManageDetailForm {
  public form:FormGroup
  public assign:FormGroup
  constructor(
    public fb:FormBuilder
  ) {
    this.form= this.fb.group({
      patient: [null],
      assign: [null],
      survey: [null],
    })
  }

}

export interface IDropdown {
  label:string;
  value:number;
}
