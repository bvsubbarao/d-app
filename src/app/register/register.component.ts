import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isDoctor: Boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  gender = [];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.gender = ['Male', 'Female'];
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  checkDoctorOrNot() {
    return this.isDoctor = (this.isDoctor === true) ? false : true;
  }
}
