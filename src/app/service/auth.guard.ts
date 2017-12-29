import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { Req2 } from './get-public-data.service';
import { UserService } from './../top/user.service'

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    public userService: UserService,
  ) { }

  checkAuth():boolean {
    let http = new Req2('get', '/auth/check')
    let isLogedIn: boolean

    http.Complete = () => {
      console.log('OK');
      console.log(http.status);
    }
    // http.AuthErr= () =>{
    //   console.log('NG');
    //   console.log(http.status);
    // }
    return true;
  }

  canActivateChild() {
    if(!this.userService.isLogedIn) { return false}
    else { return true};
  }
}
