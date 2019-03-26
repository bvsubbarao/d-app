import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: any = {};

  isDoctor = false;

  constructor(private service: DoctorServiceService, private router: Router, private datashare: DatashareService, private snackbar: MatSnackBar,

    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Doctor Appointment - User Login Page');
  }

  checkDoctorOrNot() {
    if (this.isDoctor === false) {
      this.title.setTitle('Doctor Appointment - Doctor Login Page');
      return this.isDoctor = true;
    }
    if (this.isDoctor === true) {
      this.title.setTitle('Doctor Appointment - User Login Page');
      return this.isDoctor = false;
    }
    // return this.isDoctor = (this.isDoctor === true) ? false : true;
  }

  userLogin() {
    const obj: any = {};
    obj.email = this.loginObj.email;
    obj.password = this.loginObj.password;
    obj.role = 'user';
    this.service.login(obj).subscribe(res => {
      if (res) {
        this.router.navigate(['/user']);
        this.datashare.sendRole(res['role']);
        localStorage.setItem('role', res['role']);
        localStorage.setItem('token', res['token']);
      }
      if (res['status'] === true) {
        let snackbarRef = this.snackbar.open('User Logined Successfully');
      }
    });
  }

  doctorLogin() {
    const obj: any = {};
    obj.email = this.loginObj.docEmail;
    obj.password = this.loginObj.docPassword;
    obj.role = 'doctor';
    this.service.login(obj).subscribe(res => {
      if (res) {
        this.router.navigate(['/doctorpage']);
        this.datashare.sendRole(res['role']);
        localStorage.setItem('role', res['role']);
        localStorage.setItem('token', res['token']);
      }
      if (res['status'] === true) {
        let snackbarRef = this.snackbar.open('Doctor Logined Successfully');
      }
    });
  }

}
