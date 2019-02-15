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

  constructor(private service: DoctorServiceService, private dialog: MatDialog, private title: Title) {
  }

  ngOnInit() {
    this.service.getSpecialistList().subscribe(res => {
      this.specialistList = res;
      console.log(':::', this.specialistList);
      this.title.setTitle('Doctor Appointment - User Page');
    });

  }

  /*
  * collect the patient data
  * */
  onSubmitPatientForm(specialistId) {
    let specialistid: string = specialistId;
    this.service.getspecificselectedHospitals(specialistid).subscribe(res => {
      this.requestObject.hospitals = res;
      // console.log('ddjghdjg', res)
    })
  }

  search(specialistId, hospitalId) {
    // console.log('+++++++', specialistId, hospitalId)
    this.requestObject.dates = [];
    let obj: any = {};
    obj.hospitalid = hospitalId;
    obj.specialistid = specialistId;
    if (obj.hospitalid !== undefined && obj.specialistid !== undefined) {
      this.service.getListOfDoctors(obj).subscribe(res => {
        this.requestObject.doctorlist = [];
        this.requestObject.doctorlist = res;
        this.requestObject.doctorlist.forEach((data, i) => {
          data.dob = this.service.getAge(this.requestObject.doctorlist[i].dob)
        })
        // for(let i = 0; i < this.requestObject.doctorlist.length; i++){

        // }
        console.log('=======>', obj)
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
    let currentdate = date + '-' + month + '-' + year;
    console.log('======>', currentdate)
    this.requestObject.docData = data;
    console.log('doc id is')
    this.service.getDoctorAvailableTimes(data._id).subscribe(res => {
      console.log('ioioioioio', res);
      this.slots.array = res;
      for (let i = 0; i < this.slots.array.length; i++) {
        if (currentdate <= this.slots.array[i].date) {
          this.slots.currentdateArray.push(this.slots.array[i]);
        }
      }
      console.log('avialble time slots are', this.slots.currentdateArray)
      this.slots.SelectedArray = this.slots.currentdateArray;
      // this.bookApp.
    })
    this.Slots = true;
    this.doctorList = false;

  }
  getLabel(event) {
    this.slots.array.forEach((arraydata,index) => {
      if (arraydata.date === event.tab.textLabel) {
        this.slots.SelectedArray = this.slots.array[index];
      }
    })
  }
  bookSlot(value, data, issue, date) {
    console.log(this.slots.SelectedArray.availabletime)
    this.slots.SelectedArray.availabletime.forEach((data => {
      if (value._id === data._id && value.status === true) {
        console.log(true)
        data.status = false;
      }
      else {
        console.log(true)
        data.status = true;
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
  }
}
