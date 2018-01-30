import { Injectable } from '@angular/core'
import { FormArray, AbstractControl, FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssignForm } from '../assign/assign.form'

@Injectable()
export class AssignNewForm extends AssignForm {
  constructor(fb:FormBuilder) { super(fb) }
}
