import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isDoctor: Boolean = false;

  docPersonalFormGroup: FormGroup;
  docContactFormGroup: FormGroup;
  docWorkFormGroup: FormGroup;
  userFormGroup: FormGroup;

  gender = [];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.gender = ['Male', 'Female'];


    this.userFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userMobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userGender: ['', Validators.required],
      // userDob: ['', Validators.required],
      userCity: ['', Validators.required],
      userPincode: ['', Validators.required],
    });
    this.docPersonalFormGroup = this._formBuilder.group({
      docName: ['', Validators.required],
      docEmail: ['', Validators.required],
      docPassword: ['', Validators.required],
      docGender: ['', Validators.required],
    });

    this.docContactFormGroup = this._formBuilder.group({
      docMobileNumber: ['', Validators.required],
      docState: ['', Validators.required],
      docCity: ['', Validators.required]
    });

    this.docWorkFormGroup = this._formBuilder.group({
      docWorksAt: ['', Validators.required],
      docLicenseNumber: ['', Validators.required],
      docQualification: ['', Validators.required],
      docSpecialization: ['', Validators.required],
      docFee: ['', Validators.required]
    });
  }

  checkDoctorOrNot() {
    return this.isDoctor = (this.isDoctor === true) ? false : true;
  }

  getUserRegisterDetails() {
    console.log('usr details ', this.userFormGroup.value);
  }

  getDocRegisterDetails() {
    console.log('doc personal details ', this.docPersonalFormGroup.value);
    console.log('doc contact details ', this.docContactFormGroup.value);
    console.log('doc work details ', this.docWorkFormGroup.value);
  }
}
