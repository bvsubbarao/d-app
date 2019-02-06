import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HeaderComponent} from './header/header.component';
import {RegisterComponent} from './register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {DoctorServiceService} from './doctor-service.service';
import {DoctorpageComponent} from './doctorpage/doctorpage.component';
import {UserComponent} from './user/user.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { DatashareService } from './datashare.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    DoctorpageComponent,
    UserComponent
    ProfiledetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DoctorServiceService, DatashareService],
  bootstrap: [AppComponent],
  entryComponents: [ProfiledetailsComponent]
})
export class AppModule {
}
