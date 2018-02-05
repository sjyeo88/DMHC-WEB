import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

import { LoginPanelComponent } from './login-panel/login-panel.component';
import { LoginComponent } from './login-panel/login/login.component';
import { AccessTermComponent } from './login-panel/access-term/access-term.component';
import { RegisterComponent } from './login-panel/register/register.component';
import { WelcomeComponent } from './login-panel/welcome/welcome.component'
import { ConfirmComponent } from './login-panel/confirm/confirm.component'
import { ConfirmJobComponent } from './login-panel/confirm-job/confirm-job.component'

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
import { PaginatorModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';

import { QuillModule } from 'ngx-quill'
import { PdfViewerModule } from 'ng2-pdf-viewer'

import { AppRoutingModule } from './app-routing.module';
import { AppServices } from './service/app.services';
import { AppModels } from './service/app.models';
import { Layout } from './top/layout.service'

import { PhonePipe, GenderPipe } from './pipes/phone';
import { ErrorComponent } from './error/error.component';
import { TopComponent } from './top/top.component';
import { HeaderComponent } from './top/header/header.component';
import { AsideComponent } from './top/aside/aside.component';
import { MainComponent } from './top/main/main.component';
import { ShortcutComponent } from './top/main/shortcut/shortcut.component';
import { ExpireComponent } from './expire/expire.component';
import { FrameComponent } from './top/main/frame/frame.component';
import { NewLectureComponent } from './top/main/frame/lecture/new-lecture/new-lecture.component';
import { AllLectureComponent } from './top/main/frame/lecture/all-lecture/all-lecture.component';
import { HashComponent } from './top/main/frame/assign/hash/hash.component';
import { SurveyComponent } from './top/main/frame/survey/survey/survey.component';
import { NewSurveyComponent } from './top/main/frame/survey/new-survey/new-survey.component';
import { EditSurveyComponent } from './top/main/frame/survey/edit-survey/edit-survey.component';
import { AssignComponent } from './top/main/frame/assign/assign/assign.component';
import { AssignNewComponent } from './top/main/frame/assign/assign-new/assign-new.component';
import { AssignEditComponent } from './top/main/frame/assign/assign-edit/assign-edit.component';
import { AssignAllComponent } from './top/main/frame/assign/assign-all/assign-all.component';
import { BoardComponent } from './top/main/frame/guest/board/board.component';
import { NoticeComponent } from './top/main/frame/guest/notice/notice.component';
import { FaqComponent } from './top/main/frame/guest/faq/faq.component';
import { UserComponent } from './top/main/frame/mypage/user/user.component';
import { ManageAllComponent } from './top/main/frame/manage/manage-all/manage-all.component';
import { ManageDetailComponent } from './top/main/frame/manage/manage-detail/manage-detail.component';
import { SitemapComponent } from './top/main/frame/sitemap/sitemap.component';
import { UseProcessComponent } from './top/main/frame/dmhc/use-process/use-process.component';
import { QnaComponent } from './top/main/frame/guest/qna/qna.component';

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
    GenderPipe,
    ErrorComponent,
    TopComponent,
    ConfirmComponent,
    ConfirmJobComponent,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    ShortcutComponent,
    ExpireComponent,
    NewLectureComponent,
    FrameComponent,
    AllLectureComponent,
    HashComponent,
    SurveyComponent,
    NewSurveyComponent,
    EditSurveyComponent,
    AssignComponent,
    AssignNewComponent,
    AssignEditComponent,
    AssignAllComponent,
    BoardComponent,
    NoticeComponent,
    FaqComponent,
    UserComponent,
    ManageAllComponent,
    ManageDetailComponent,
    SitemapComponent,
    UseProcessComponent,
    QnaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
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
    PdfViewerModule,
    PaginatorModule,
    RadioButtonModule,
    SpinnerModule,
    ScheduleModule,
  ],
  providers: [
    Title,
    AppServices,
    AppModels,
    ConfirmationService,
    { provide: COMPOSITION_BUFFER_MODE, // 한글 입력시 반영 타이밍 문제
      useValue: false,
    },
    Layout,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
