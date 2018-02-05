import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppServices } from './app.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public serv: AppServices,
  ) { }

  canActivate() {
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
