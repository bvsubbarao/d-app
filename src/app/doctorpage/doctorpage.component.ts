import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-doctorpage',
  templateUrl: './doctorpage.component.html',
  styleUrls: ['./doctorpage.component.css']
})
export class DoctorpageComponent implements OnInit {

  listOfApplicant: boolean = true;
  Availability: boolean = false;
  data: any;
  array: any = {};
  docObj: any = {};
  tabGroup: any;
  selectedDate: any;
  timeSlots: any = [];
  timeSlotsNew: any = [];
  createSlotArray: any = [];
  selectObj: any = {};
  appointmentList: any = {};
  confirmBookingList: any = {};
  // date = new Date();

  constructor(private server: DoctorServiceService, private title: Title, private snackbar: MatSnackBar) { }

  ngOnInit() {
    // this.tabGroup._tabs.first.textLabel
    this.selectObj.key = 'applicant';
    this.getAppointmentList();
    this.title.setTitle('Doctor Appointment - Doctor Page');
  }

  available(key) {
    if (key === 'applicant') {
      this.listOfApplicant = true;
      this.Availability = false;
      this.selectObj.key = key;
    }
    else if (key === 'available') {
      this.selectObj.key = key;
      this.selectedDate = this.dateConvert(0);
      this.getDoctorTimeSlots();
      // this.selectedTimeSlots();
      this.array.dates = [];
      this.listOfApplicant = false;
      this.Availability = true;


      for (let i = 0; i < 7; i++) {
        this.data = this.dateConvert(i);
        this.array.dates.push(this.data);
      }
    }
  }
  dateConvert(i) {
    let date = new Date();
    let year = date.getFullYear();
    let month: any = (date.getMonth()) + 1;
    let currentdate: any = date.getDate() + i;
    if (month < 10) {
      month = '0' + month;
    }
    if (currentdate < 10) {
      currentdate = '0' + currentdate;
    }
    // else{
    //   month = (date.getMonth()) + 1;
    //   currentdate = date.getDate() + i;
    // }
    return year + '-' + month + '-' + currentdate;
  }
  getLabel(date) {
    this.selectedDate = date['tab']['textLabel'];
    // this.getDoctorTimeSlots();
    // this.timeSlots = this.timeSlotsNew;
    this.selectedTimeSlots();
  }
  getDoctorTimeSlots() {
    this.server.getTimeSlots().subscribe(res => {
      this.timeSlots = res;
      this.timeSlotsNew = [...this.timeSlots];
      this.selectedTimeSlots();

    })
  }
  bookSlot(value) {
    this.timeSlots.forEach((data => {
      if (value._id === data._id && value.status === 'not available for booking') {
        data.status = 'available for booking';
      }
      else if (value._id === data._id && value.status === 'available for booking') {
        data.status = 'not available for booking';
      }
    }));
  }
  saveDoctorSlots() {
    let obj: any = {};
    obj.date = this.selectedDate;
    obj.availabletime = this.timeSlots;
    this.server.sendTimeSlots(obj).subscribe(res => {
      if (res['status'] === true) {
        this.selectedTimeSlots();
        let snackbarRef = this.snackbar.open(res['message']);
      }
    })
  }
  selectedTimeSlots() {
    this.timeSlots = this.timeSlotsNew;

    this.server.getSlots().subscribe(res => {
      this.createSlotArray = res;
      if (this.createSlotArray.length > 0) {
        this.createSlotArray.forEach(data => {
          if (data.date == this.selectedDate) {
            this.timeSlots = data['availabletime'];
          }
        })
      }
    })
  }
  getAppointmentList() {
    this.appointmentList.confirmedList = [];
    this.server.getAppointmentsListFromUser().subscribe(res => {
      this.appointmentList.appointments = res;
      this.appointmentList.appointments.forEach((data, i) => {
        data.dob = this.server.getAge(this.appointmentList.appointments[i].bookedby.dob)
      });

      let date = new Date();
      let year = date.getFullYear();
      let month: any = (date.getMonth()) + 1;
      let currentdate: any = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (currentdate < 10) {
        currentdate = '0' + currentdate;
      }
      let todaydate = year + '-' + month + '-' + currentdate;
      for (let i = 0; i < this.appointmentList.appointments.length; i++) {
        this.appointmentList.confirmedList.push(this.appointmentList.appointments[i])
      }
      let appSchCondition = 0, appConfirmCondition = 0;
      for (let i = 0; i < this.appointmentList.confirmedList.length; i++) {
        if (this.appointmentList.confirmedList[i].confirmstatus === false) {
          appSchCondition++;
        }
        if (this.appointmentList.confirmedList[i].confirmstatus === true) {
          appConfirmCondition++;
        }
        if (appSchCondition === this.appointmentList.confirmedList.length) {
          this.appointmentList.appSchCondition = 'No appointments scheduled';
        }
        if (appConfirmCondition === this.appointmentList.confirmedList.length) {
          this.appointmentList.appConfirmCondition = 'No appointments confirmed';
        }
      }
      // this.appointmentList.appointments.sort(function (a, b) {
      //   let date1 = new Date(a.date);
      //   let date2 = new Date(b.date);
      //   return date2.getTime() - date1.getTime();
      // });
      // this.appointmentList.confirmedList.sort(function (a, b) {

      //   let date1 = new Date(a.date);
      //   let date2 = new Date(b.date);

      //   return date2.getTime() - date1.getTime();
      // });
      // if(this.appointmentList.appointments === undefined){
      // }
    })

  }
  confirmAppointment(data) {
    let obj: any = {};
    obj.appointmentid = data._id;
    obj.confirmstatus = true;
    obj.bookingid = data.bookingid;
    this.server.confirmappointment(obj).subscribe(res => {
      // this.confirmBookingList = res;
      // this.confirmBookingList.confirmlist = [];
      // this.confirmBookingList.confirmlist.push(this.confirmBookingList['data']);
      this.getAppointmentList();
    })
  }
}

