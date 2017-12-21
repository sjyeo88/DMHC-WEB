import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

import { LoginPanelComponent } from './login-panel/login-panel.component';
import { LoginComponent } from './login-panel/login/login.component';
import { AccessTermComponent } from './login-panel/access-term/access-term.component';
import { RegisterComponent } from './login-panel/register/register.component';
import { WelcomeComponent } from './login-panel/welcome/welcome.component'

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { MenuItem } from 'primeng/components/common/api';
import { CalendarModule } from 'primeng/primeng'
import { DropdownModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';

import { PhonePipe } from './pipes/phone';
import { ErrorComponent } from './error/error.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginPanelComponent,
    AccessTermComponent,
    RegisterComponent,
    LoginComponent,
    WelcomeComponent,
    PhonePipe,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    AccordionModule,
    DropdownModule,
    AppRoutingModule,
    CheckboxModule,
    FileUploadModule,
    GrowlModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
