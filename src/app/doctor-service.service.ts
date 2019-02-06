import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  baseUrl: string = "http://192.168.1.5:9000";
  timeslots: any = [];
  constructor(private httpRef: HttpClient) { }

  getStatesData() {
    return this.httpRef.get(this.baseUrl + '/api/states/getallstates');
  }
  getCitiesData() {
    return this.httpRef.get(this.baseUrl + '/api/cities/getallcities');
  }

  register(data) {
    return this.httpRef.post(this.baseUrl + '/api/users/create', data);
  }
  login(data) {
    console.log(data)
    return this.httpRef.post(this.baseUrl + '/api/users/login', data);
  }
  getHospitals() {
    return this.httpRef.get(this.baseUrl + '/api/hospitals/getallhospitals');
  }
  getSpecialization() {
    return this.httpRef.get(this.baseUrl + '/api/specialists/getallspecialists');
  }
  getTimeSlots() {
    return this.httpRef.get(this.baseUrl + '/api/timeslots/gettimeslots');
  }
  sendTimeSlots(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/availability/createslot', data, httpOptions);
  }
  getSlots() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.get(this.baseUrl + '/api/availability/getAvailableslots', httpOptions);
  }
  getProfileData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.get(this.baseUrl + '/api/users/getprofile/user', httpOptions);
  }
  updateprofiledetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/users/updateprofile', data, httpOptions);
  }

}
