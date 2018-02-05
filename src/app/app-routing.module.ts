import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './service/auth.guard';

import { LoginPanelComponent } from './login-panel/login-panel.component';
import { LoginComponent } from './login-panel/login/login.component';
import { AccessTermComponent } from './login-panel/access-term/access-term.component';
import { RegisterComponent } from './login-panel/register/register.component';
import { WelcomeComponent } from './login-panel/welcome/welcome.component'
import { ConfirmComponent } from './login-panel/confirm/confirm.component'
import { ConfirmJobComponent } from './login-panel/confirm-job/confirm-job.component'
import { ErrorComponent } from './error/error.component'
import { ExpireComponent } from './expire/expire.component'
import { TopComponent } from './top/top.component'
import { MainComponent } from './top/main/main.component'
import { ShortcutComponent } from './top/main/shortcut/shortcut.component'
import { FrameComponent } from './top/main/frame/frame.component'
import { NewLectureComponent } from './top/main/frame/lecture/new-lecture/new-lecture.component'
import { AllLectureComponent } from './top/main/frame/lecture/all-lecture/all-lecture.component'
import { NewSurveyComponent } from './top/main/frame/survey/new-survey/new-survey.component'
import { EditSurveyComponent } from './top/main/frame/survey/edit-survey/edit-survey.component'
import { HashComponent } from './top/main/frame/assign/hash/hash.component'
import { AssignNewComponent } from './top/main/frame/assign/assign-new/assign-new.component';
import { AssignEditComponent } from './top/main/frame/assign/assign-edit/assign-edit.component';
import { AssignAllComponent } from './top/main/frame/assign/assign-all/assign-all.component';
import { NoticeComponent } from './top/main/frame/guest/notice/notice.component';
import { ManageAllComponent } from './top/main/frame/manage/manage-all/manage-all.component';
import { ManageDetailComponent } from './top/main/frame/manage/manage-detail/manage-detail.component';
import { SitemapComponent } from './top/main/frame/sitemap/sitemap.component';
import { FaqComponent } from './top/main/frame/guest/faq/faq.component';
import { QnaComponent } from './top/main/frame/guest/qna/qna.component';
import { UserComponent } from './top/main/frame/mypage/user/user.component';
import { UseProcessComponent } from './top/main/frame/dmhc/use-process/use-process.component';


const routes: Routes = [
  // {path: '', redirectTo: '/login-panel', pathMatch: 'full'},
  {path: '', redirectTo: 'login-panel', pathMatch: 'full'},
  { path: 'top', component: TopComponent,
    canActivateChild: [ AuthGuard ],
    children: [
        {path: '', redirectTo: 'main', pathMatch:'full'},
        {path: 'main', component: MainComponent,
          children: [
            {path: '', redirectTo: 'shortcut', pathMatch: 'full'},
            {path: 'shortcut', component: ShortcutComponent },
            {path: 'frame', component: FrameComponent,
              children: [
                {path: 'sitemap', component: SitemapComponent },
                {path: 'dmhc/process', component: UseProcessComponent },
                {path: 'lecture/all', component: AllLectureComponent },
                {path: 'lecture/new', component: NewLectureComponent },
                {path: 'survey/new', component: NewSurveyComponent },
                {path: 'survey/edit', component: EditSurveyComponent },
                {path: 'assign/all', component: AssignAllComponent},
                {path: 'assign/new', component: AssignNewComponent },
                {path: 'assign/edit', component: AssignEditComponent },
                {path: 'assign/hash', component: HashComponent },
                {path: 'manage/all', component: ManageAllComponent },
                {path: 'manage/detail', component: ManageDetailComponent },
                {path: 'manage/detail/:idPATIENT_USER', component: ManageDetailComponent },
                {path: 'mypage/user', component: UserComponent },
                {path: 'guest/notice', component: NoticeComponent },
                {path: 'guest/notice/:idNOTICE', component: NoticeComponent },
                {path: 'guest/faq', component: FaqComponent },
                {path: 'guest/qna', component: QnaComponent },
                ]
            },
          ]
        },
    ]
  },
  { path: 'login-panel', component: LoginPanelComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'access-term', component: AccessTermComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'confirm', component: ConfirmComponent },
      {path: 'confirm/job', component: ConfirmJobComponent },
    ]
  },
  {path: 'expire', component: ExpireComponent},
  {path: '**', component: ErrorComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  //For routing problem
  exports: [ RouterModule ],
  providers: [ AuthGuard ],
  // declarations: []
})
export class AppRoutingModule { }
