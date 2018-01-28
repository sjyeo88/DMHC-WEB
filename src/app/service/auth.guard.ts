import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { Req2 } from './get-public-data.service';
import { UserService } from './../top/user.service'

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    public us: UserService,
  ) { }

  canActivateChild() {
    if(!this.us.isLogedIn) {
      this.router.navigate(['/expire']);
      return false
    }
    else {
      return true
    };
  }
}
