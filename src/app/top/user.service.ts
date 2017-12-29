import { Injectable } from '@angular/core'

@Injectable()
export class UserService {
  public isLogedIn:boolean = false;
  public user = {
    email:'',
    name:'',
    job:'',
    dept:'',
    idJOBS:'',
    idDEPT:'',
    loginTime:'',
  }
}
