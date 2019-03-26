import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorServiceService } from '../doctor-service.service';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

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

  stateObj: any = {};

  constructor(private _formBuilder: FormBuilder, private service: DoctorServiceService, private router: Router, private datashare: DatashareService, private snackbar: MatSnackBar,

    private title: Title) {
  }

  ngOnInit() {
    this.gender = ['Male', 'Female'];


    this.userFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userMobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userGender: ['', Validators.required],
      userDob: ['', Validators.required],
      userCity: ['', Validators.required],
      userPincode: ['', Validators.required],
      userStae: ['', Validators.required],
    });
    this.docPersonalFormGroup = this._formBuilder.group({
      docName: ['', Validators.required],
      docEmail: ['', Validators.required],
      docPassword: ['', Validators.required],
      docGender: ['', Validators.required],
      docDob: ['', Validators.required]
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

    this.getStatesList();
    this.getCitiesList();
    this.getHospitalsList();
    this.getspecilizationList();
    // this.title.setTitle('Register Page');

    this.title.setTitle('Doctor Appointment - User Register Page');
  }

  checkDoctorOrNot() {
    if (this.isDoctor === false) {
      this.title.setTitle('Doctor Appointment - Doctor Register Page');
      return this.isDoctor = true;
    }
    if (this.isDoctor === true) {
      this.title.setTitle('Doctor Appointment - User Register Page');
      return this.isDoctor = false;
    }
    // return this.isDoctor = (this.isDoctor === true) ? false : true;
  }

  // getUserRegisterDetails() {
  // }

  // getDocRegisterDetails() {

  // }

  getStatesList() {
    this.service.getStatesData().subscribe(res => {
      this.stateObj.Array = res;
    })
  }
  getCitiesList() {
    this.service.getCitiesData().subscribe(res => {
      this.stateObj.cities = res;
    })
  }

  getCityName(states) {
    this.stateObj.filterCities = [];
    for (let i = 0; i < this.stateObj.cities.length; i++) {
      if (states['code'] === this.stateObj.cities[i]['stateid']['code']) {
        this.stateObj.filterCities.push(this.stateObj.cities[i]);
      }
    }
  }
  getHospitalsList() {
    this.service.getHospitals().subscribe(res => {
      this.stateObj.hospitals = res;
    })
  }
  getspecilizationList() {
    this.service.getSpecialization().subscribe(res => {
      this.stateObj.specialization = res;
    })
  }

  // register() {
  // }

  userRegister() {
    let obj: any = {};
    obj.name = this.stateObj.userName;
    obj.email = this.stateObj.userEmail;
    obj.gender = this.stateObj.userGender;
    obj.stateid = this.stateObj.states['_id'];
    obj.cityid = this.stateObj.cityId;
    obj.mobile = this.stateObj.userMobileNumber;
    obj.pincode = this.stateObj.userPincode;
    obj.role = 'user';
    obj.password = this.stateObj.userPassword;
    obj.dob = this.stateObj.userDob;
    this.service.register(obj).subscribe(res => {
      if (res) {
        localStorage.setItem('role', res['role']);
        this.datashare.sendRole(res['role']);
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/user']);
      }
      if (res['status'] === true) {
        let snackbarRef = this.snackbar.open(" User Registered Successfully ")
      }
    })
  }
  doctorRegister() {
    let obj: any = {};
    obj.name = this.stateObj.docName;
    obj.email = this.stateObj.docEmail;
    obj.gender = this.stateObj.docGender;
    obj.stateid = this.stateObj.data['_id'];
    obj.cityid = this.stateObj.docCityId;
    obj.mobile = this.stateObj.docMobileNumber;
    obj.password = this.stateObj.docPassword;
    obj.dob = this.stateObj.docDob;
    obj.specialistid = this.stateObj.specializationId;
    obj.qualification = this.stateObj.docQualification;
    obj.workat = this.stateObj.docWorksAtId;
    obj.licensenumber = this.stateObj.docLicenseNumber;
    obj.fee = this.stateObj.docFee;
    obj.role = 'doctor';
    this.service.register(obj).subscribe(res => {
      if (res) {
        localStorage.setItem('role', res['role']);
        this.datashare.sendRole(res['role']);
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/doctorpage']);
      }
      if (res['status'] === true) {
        let snackbarRef = this.snackbar.open(" Doctor Registered Successfully ")
      }
    })
  }
  getCityHospitals(cityId) {
    this.stateObj.filterHospitals = [];
    for (let i = 0; i < this.stateObj.hospitals.length; i++) {
      if (cityId === this.stateObj.hospitals[i].cityid._id) {
        this.stateObj.filterHospitals.push(this.stateObj.hospitals[i]);
      }
    }
  }

}
