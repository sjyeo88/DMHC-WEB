import { Component, OnInit } from '@angular/core';
import { GetPublicDataService } from '../../get-data/get-public-data.service';
import { Admin } from '../../get-data/get-data';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public admin:Admin;
  public isDataLoaded:boolean = false;
  constructor(private dataService: GetPublicDataService) {
  }

  ngOnInit() {
    this.getAdmin();
    console.log(this.admin);
  }

  getAdmin():void {
    this.dataService.getAdmin()
    .subscribe(
      admin => {
        this.admin = admin[0];
        this.isDataLoaded = true;
      }
    )
  }
}
