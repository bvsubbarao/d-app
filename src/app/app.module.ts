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
import { ApplyCoupnComponent } from './apply-coupn/apply-coupn.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    DoctorpageComponent,
    UserComponent,
    ProfiledetailsComponent,
    ApplyCoupnComponent
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
  providers: [DoctorServiceService, DatashareService, {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent],
  entryComponents: [ProfiledetailsComponent,ApplyCoupnComponent]
})
export class AppModule {
}
