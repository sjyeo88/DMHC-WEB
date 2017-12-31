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
import { ConfirmComponent } from './login-panel/confirm/confirm.component'

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { MenuItem } from 'primeng/components/common/api';
import { CalendarModule } from 'primeng/primeng'
import { DropdownModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';

import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { UserService } from './top/user.service'
import { Layout } from './top/layout.service'

import { PhonePipe } from './pipes/phone';
import { ErrorComponent } from './error/error.component';
import { TopComponent } from './top/top.component';
import { HeaderComponent } from './top/header/header.component';
import { AsideComponent } from './top/aside/aside.component';
import { MainComponent } from './top/main/main.component';
import { ShortcutComponent } from './top/main/shortcut/shortcut.component';
import { ExpireComponent } from './expire/expire.component';
import { NewLectureComponent } from './top/main/frame/lecture/new-lecture/new-lecture.component';
import { FrameComponent } from './top/main/frame/frame.component';

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
    TopComponent,
    ConfirmComponent,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    ShortcutComponent,
    ExpireComponent,
    NewLectureComponent,
    FrameComponent,
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
    QuillModule,
    SelectButtonModule,
    ConfirmDialogModule,
    DialogModule,
    OverlayPanelModule,
  ],
  providers: [
    Title,
    UserService,
    ConfirmationService,
    Layout,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
