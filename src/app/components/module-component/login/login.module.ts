import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.component';

export const routes: Routes = [
  { path: 'login', component: LoginPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginPage
  ]

})

export class LoginModule { }
