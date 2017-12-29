import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { LoginPanelComponent } from './login-panel/login-panel.component';
import { LoginComponent } from './login-panel/login/login.component';
import { AccessTermComponent } from './login-panel/access-term/access-term.component';
import { RegisterComponent } from './login-panel/register/register.component';
import { WelcomeComponent } from './login-panel/welcome/welcome.component'
import { ConfirmComponent } from './login-panel/confirm/confirm.component'
import { ErrorComponent } from './error/error.component'
import { ExpireComponent } from './expire/expire.component'
import { TopComponent } from './top/top.component'
import { MainComponent } from './top/main/main.component'
import { ShortcutComponent } from './top/main/shortcut/shortcut.component'
import { FrameComponent } from './top/main/frame/frame.component'
import { NewLectureComponent } from './top/main/frame/lecture/new-lecture/new-lecture.component'


const routes: Routes = [
  // {path: '', redirectTo: '/login-panel', pathMatch: 'full'},
  {path: '', redirectTo: 'login-panel', pathMatch: 'full'},
  { path: 'top', component: TopComponent,

    children: [
        {path: '', redirectTo: 'main', pathMatch:'full'},
        {path: 'main', component: MainComponent,
          children: [
            {path: '', redirectTo: 'shortcut', pathMatch: 'full'},
            {path: 'shortcut', component: ShortcutComponent },
            {path: 'frame', component: FrameComponent,
              children: [
                {path: 'lecture/new', component: NewLectureComponent },
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
      {path: 'confirm/:userId', component: ConfirmComponent },
    ]
  },
  {path: 'expire', component: ExpireComponent},
  {path: '**', component: ErrorComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [],
  // declarations: []
})
export class AppRoutingModule { }
