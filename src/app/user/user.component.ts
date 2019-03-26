import { Component, OnInit } from '@angular/core';
// import { CommonService } from '../common.service';
import { DoctorServiceService } from '../doctor-service.service';
import { ApplyCoupnComponent } from '../apply-coupn/apply-coupn.component';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // patientDetailsFormGroup: FormGroup;
  specialistList: any = [];
  hospitalList: any = [];
  requestObject: any = {};
  selectedDate: any = {};
  slots: any = {};
  bookApp: any = {};
  doctorList: boolean = true;
  Slots: boolean;
  message: string;

  constructor(private service: DoctorServiceService, private dialog: MatDialog, private title: Title) {
  }

  ngOnInit() {
    this.service.getSpecialistList().subscribe(res => {
      this.specialistList = res;
      this.title.setTitle('Doctor Appointment - User Page');
    });

  }

  /*
  * collect the patient data
  * */
  onSubmitPatientForm(specialistId) {
    this.requestObject.hospitals = [];
    this.message = '';
    let specialistid: string = specialistId;
    this.service.getspecificselectedHospitals(specialistid).subscribe(res => {
      if (res['status'] === false) {
        this.message = res['message'];
      }
      else {
        this.requestObject.hospitals = res;
      }
    })
  }

  search(specialistId, hospitalId) {
    this.requestObject.dates = [];
    this.message = '';
    let obj: any = {};
    obj.hospitalid = hospitalId;
    obj.specialistid = specialistId;
    this.doctorList = true;
    this.Slots = false;
    if (obj.hospitalid !== undefined && obj.specialistid !== undefined) {
      this.service.getListOfDoctors(obj).subscribe(res => {
        if (res['status'] === false) {
          this.message = res['message'];
        }
        else {
          this.requestObject.doctorlist = [];
          this.requestObject.doctorlist = res;
          this.requestObject.doctorlist.forEach((data, i) => {
            data.dob = this.service.getAge(this.requestObject.doctorlist[i].dob)
          })
        }
        // for(let i = 0; i < this.requestObject.doctorlist.length; i++){

        // }
      })
    }

  }

  getavailTimes(data) {
    this.slots.currentdateArray = [];
    let currentDate = new Date();
    let year: any = currentDate.getFullYear();
    let month: any = currentDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let date: any = currentDate.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    let currentdate = year + '-' + month + '-' + date;
    this.requestObject.docData = data;
    this.service.getDoctorAvailableTimes(data._id).subscribe(res => {
      this.slots.array = res;
      for (let i = 0; i < this.slots.array.length; i++) {
        // if (currentdate <= this.slots.array[i].date) {
        this.slots.currentdateArray.push(this.slots.array[i]);
        // }
      }
      this.slots.SelectedArray = this.slots.currentdateArray;
      // this.bookApp.
    })
    this.Slots = true;
    this.doctorList = false;

  }
  getLabel(event) {
    this.slots.array.forEach((arraydata, index) => {
      if (arraydata.date === event.tab.textLabel) {
        this.slots.SelectedArray = this.slots.array[index];
      }
    })
  }
  bookSlot(value, data, issue, date) {
    let tempData = [...this.slots.SelectedArray.availabletime]
    this.slots.SelectedArray.availabletime.forEach((data => {
      if (data.status !== 'booked') {
        if (value._id === data._id && value.status === 'available for booking') {
          data.status = 'not available for booking';
        }
        else {
          data.status = 'available for booking';
        }
      }
    }));

    let obj1: any = {}
    obj1.value = value;
    obj1.docData = this.requestObject.docData;
    obj1.issue = issue;
    obj1.date = date;
    let dialog = this.dialog.open(ApplyCoupnComponent, {
      data: obj1,
    });
    dialog.afterClosed().subscribe(response => {
      // this.slots.SelectedArray.availabletime = [...tempData]
    })
  }
}
