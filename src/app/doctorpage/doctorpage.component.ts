import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { Title } from '@angular/platform-browser';

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

  constructor(private server: DoctorServiceService, private title: Title) { }

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
      this.selectedTimeSlots();
      console.log('----', this.selectedDate)
      this.array.dates = [];
      this.listOfApplicant = false;
      this.Availability = true;


      for (let i = 0; i < 7; i++) {
        this.data = this.dateConvert(i);
        this.array.dates.push(this.data);
        console.log('-----', this.array.dates)
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
    return currentdate + '-' + month + '-' + year;
  }
  getLabel(date) {
    this.selectedDate = date['tab']['textLabel'];
    this.getDoctorTimeSlots();
    this.selectedTimeSlots();
  }
  getDoctorTimeSlots() {
    this.server.getTimeSlots().subscribe(res => {
      this.timeSlots = res;
    })
  }
  bookSlot(value) {
    console.log('------------->', value)
    this.timeSlots.forEach((data => {
      if (value._id === data._id && value.status === false) {
        data.status = true;
      }
      else if (value._id === data._id && value.status === true) {
        data.status = false;
      }
    }));
  }
  saveDoctorSlots() {
    let obj: any = {};
    obj.date = this.selectedDate;
    obj.availabletime = this.timeSlots;
    this.server.sendTimeSlots(obj).subscribe(res => {
      console.log('000000', res)
      if (res) {
        this.selectedTimeSlots();
      }
    })
  }
  selectedTimeSlots() {
    this.server.getSlots().subscribe(res => {
      console.log(res)
      this.createSlotArray = res;
      if (this.createSlotArray.length > 0) {
        this.createSlotArray.forEach(data => {
          console.log('------->', data, this.selectedDate)
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
      console.log('res is', res);
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
      let todaydate = currentdate + '-' + month + '-' + year;
      console.log('iiiiiiii', todaydate)
      for(let i = 0; i < this.appointmentList.appointments.length; i++){
        if(todaydate <= this.appointmentList.appointments[i]['date']){
          this.appointmentList.confirmedList.push(this.appointmentList.appointments[i])
        }
      }
      let appSchCondition = 0, appConfirmCondition = 0;
      for (let i = 0; i < this.appointmentList.confirmedList.length; i++) {
        if (this.appointmentList.confirmedList[i].confirmstatus === false) {
          appSchCondition++;
        }
        if (this.appointmentList.confirmedList[i].confirmstatus === true) {
          appConfirmCondition++;
        }
        if (appSchCondition === i) {
          this.appointmentList.appSchCondition = 'No appointments scheduled';
        }
        if (appConfirmCondition === i) {
          this.appointmentList.appConfirmCondition = 'No appointments Confirmed';
        }
      }
      // this.appointmentList.appointments.sort(function (a, b) {
      //   let date1 = new Date(a.date);
      //   let date2 = new Date(b.date);
      //   return date2.getTime() - date1.getTime();
      // });
      // this.appointmentList.confirmedList.sort(function (a, b) {
      //   console.log('ududgdgd', a, b)
      //   let date1 = new Date(a.date);
      //   let date2 = new Date(b.date);
      //   console.log('dates are', date1, date2)
      //   return date2.getTime() - date1.getTime();
      // });
      // if(this.appointmentList.appointments === undefined){
      //   console.log('keyyyyy',this.appointmentList.appointments);
      // }
    })

  }
  confirmAppointment(data) {
    let obj: any = {};
    obj.appointmentid = data._id;
    obj.confirmstatus = true;
    obj.bookingid = data.bookingid;
    console.log('====>', obj)
    this.server.confirmappointment(obj).subscribe(res => {
      // this.confirmBookingList = res;
      // this.confirmBookingList.confirmlist = [];
      // this.confirmBookingList.confirmlist.push(this.confirmBookingList['data']);
      // console.log('confirm status',this.confirmBookingList.confirmlist);
      this.getAppointmentList();
    })
  }
}

