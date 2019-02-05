import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../doctor-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: any = {};

  isDoctor = false;

  constructor(private service: DoctorServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  checkDoctorOrNot() {
    return this.isDoctor = (this.isDoctor === true) ? false : true;
  }

  userLogin() {
    const obj: any = {};
    obj.email = this.loginObj.email;
    obj.password = this.loginObj.password;
    obj.role = 'user';
    // console.log('---------->')
    this.service.login(obj).subscribe(res => {
      console.log('--->', res);
      if (res) {
        this.router.navigate(['/user']);
      }
    });
  }

  doctorLogin() {
    const obj: any = {};
    obj.email = this.loginObj.docEmail;
    obj.password = this.loginObj.docPassword;
    obj.role = 'doctor';
    this.service.login(obj).subscribe(res => {
      console.log('--->', res);
      if (res) {
        this.router.navigate(['/doctorpage']);
      }
    });
  }

}
