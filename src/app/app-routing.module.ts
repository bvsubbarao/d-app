import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DoctorpageComponent } from './doctorpage/doctorpage.component'
import {UserComponent} from './user/user.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  {path: '', redirectTo:'/register', pathMatch:'full'},
  // { path: 'header', component: HeaderComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent},
  { path: 'doctorpage', component: DoctorpageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
