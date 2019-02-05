import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-doctorpage',
  templateUrl: './doctorpage.component.html',
  styleUrls: ['./doctorpage.component.css']
})
export class DoctorpageComponent implements OnInit {

  listOfApplicant: boolean = true;
  Availability: boolean = false;
  data:any;
  array:any = {};
  docObj:any = {};
  tabGroup:any;
  selectedDate:any;
  timeSlots:any=[];
  timeSlotsNew:any=[];
  createSlotArray:any=[];
  // date = new Date();

  constructor(private server: DoctorServiceService) { }

  ngOnInit() {
    // this.tabGroup._tabs.first.textLabel
  }

  applcant() {
    this.listOfApplicant = true;
    this.Availability = false;
  }
  available() {
    this.selectedDate = this.dateConvert(0);
    this.getDoctorTimeSlots();
    this.selectedTimeSlots();
    console.log('----', this.selectedDate)
    this.array.dates = [];
    this.listOfApplicant = false;
    this.Availability = true;

    
    for(let i = 0; i < 7; i++){
      this.data = this.dateConvert(i);
      this.array.dates.push(this.data);
      console.log('-----', this.array.dates)
    }
  }
  dateConvert(i){
    let date = new Date();
    let year = date.getFullYear();
    let month:any = (date.getMonth()) + 1;
    let currentdate:any = date.getDate() + i;
    if(month < 10 ){
      month = '0' + month;
    }
    if(currentdate < 10){
      currentdate = '0' + currentdate;
    }
    // else{
    //   month = (date.getMonth()) + 1;
    //   currentdate = date.getDate() + i;
    // }
    return currentdate + '-' + month + '-' + year;
  }
  getLabel(date){
    this.selectedDate = date['tab']['textLabel'];
    this.getDoctorTimeSlots();
    this.selectedTimeSlots();
  }
  getDoctorTimeSlots(){
    this.server.getTimeSlots().subscribe(res => {
      this.timeSlots = res;
    })
  }
  bookSlot(value){
    console.log('------------->', value)
    this.timeSlots.forEach((data => {
      if(value._id === data._id && value.status === false){
        data.status = true;
      }
      else if(value._id === data._id && value.status === true){
        data.status = false;
      }
    }));
  }
  saveDoctorSlots(){
    let obj:any = {};
    obj.date = this.selectedDate;
    obj.availabletime = this.timeSlots;
    this.server.sendTimeSlots(obj).subscribe(res => {
      console.log('000000', res)
      if(res){
        this.selectedTimeSlots();
      }
    })
  }
  selectedTimeSlots(){
    this.server.getSlots().subscribe(res => {
      console.log(res)
      this.createSlotArray = res;
      if(this.createSlotArray.length > 0){
        this.createSlotArray.forEach(data=>{
          console.log('------->',data , this.selectedDate)
          if(data.date == this.selectedDate){
            this.timeSlots = data['availabletime'];
          }
        })
      }
    })
  }
}

