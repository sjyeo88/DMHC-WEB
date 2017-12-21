import { Component, OnInit } from '@angular/core';
import { RegistData } from '../get-data/auth-data';
import { TermAgree } from  '../get-data/get-data';
import { RegexValidators } from "./register/register.validator";
import { GetPublicDataService } from '../get-data/get-public-data.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss',],
  providers: [TermAgree, RegistData, RegexValidators, GetPublicDataService,]
})
export class LoginPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
