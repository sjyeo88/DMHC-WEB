import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { AppServices } from './app.services';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    public serv: AppServices,
  ) { }

  canActivateChild() {
    return this.serv.chkSession()
    .then(data=>{
      return true;
    })
    .catch(()=>{
      this.router.navigate(['/expire']);
      return false;
    })
  }
}
