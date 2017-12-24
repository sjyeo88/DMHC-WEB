import { Injectable } from '@angular/core'

export class Job {
    idJOBS:number;
    name:string;
    add_time:string;
}

export class User {
    idEXPERT_USER:number;
    name:string;
    email:string;
}

export class Dept {
    idDEPT:number;
    name:string;
    add_time:string;
}

export class Admin {
    name:string;
    email:string;
    phone:string;
}

@Injectable()
export class TermAgree {
  public a_term_agree: boolean;
  public p_term_agree: boolean;
}
