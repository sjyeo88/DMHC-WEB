import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppServices } from './service/app.services';
import { Router } from '@angular/router';
import { globals } from './../environments/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MessageService,
  ]
})
export class AppComponent {
  public globals = globals;
  public constructor(
    private titleService: Title,
    public serv:AppServices,
    public router:Router,
  ) {

    let title:string = 'app';
    let appName: string = '매일마음관리 - 관리자페이지';
    let version: string = '1.0';
    this.setTitle(appName)
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle )
  }

  public hideLoginPanel():string {
    return "none"
  }
}
