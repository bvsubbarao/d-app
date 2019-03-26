import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  baseUrl: string = "http://192.168.1.14:9000";
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
    return this.httpRef.get(this.baseUrl + '/api/availability/getAvailableslotsdoctor', httpOptions);
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
  getSpecialistList() {
    return this.httpRef.get(this.baseUrl + '/api/specialists/getallspecialists');
  }
  getspecificselectedHospitals(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };

    return this.httpRef.get(this.baseUrl + '/api/hospitals/getspecifichospitals/' + id, httpOptions);
  }
  getListOfDoctors(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/users/getdoctorslist', data, httpOptions);
  }
  getAge(isodate) {
    let birthdate: any = new Date(isodate);
    let cur: any = new Date();
    let diff = cur - birthdate; // This is the difference in milliseconds
    let age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
    return age;
  }
  getDoctorAvailableTimes(docId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.get(this.baseUrl + '/api/availability/getAvailableslotsforuser/' + docId, httpOptions);
  }
  getCoupencode(code) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/coupons//applycoupon', code, httpOptions);
  }
  bookAppointment(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/appointments/bookappointment', data, httpOptions);
  }
  getAppointmentsListFromUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.get(this.baseUrl + '/api/appointments/getallappointments', httpOptions);
  }
  confirmappointment(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
    return this.httpRef.post(this.baseUrl + '/api/appointments/updateappointment', data, httpOptions);
  }
  getAllappointments() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    };
  }
}
