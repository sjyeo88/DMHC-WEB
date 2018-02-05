import { User, Admin } from './../interfaces/shared.interface';
import { Injectable } from '@angular/core'

@Injectable()
export class AppModels {
  public user:User = {
    idEXPERT_USER:0,
    name:'',
    email:'',
    deptName:'',
    idDEPT:0,
    jobName:'',
    idJOBS:0,
    birth:'',
    phone:0,
    loginDate: new Date(),
  };

  public admin:Admin = {
    name:'',
    email:'',
    phone:0,
  };
}

@Injectable()
export class TermAgree {
  public a_term_agree: boolean;
  public p_term_agree: boolean;
}
