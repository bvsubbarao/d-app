import { Component, OnInit,Inject } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-apply-coupn',
  templateUrl: './apply-coupn.component.html',
  styleUrls: ['./apply-coupn.component.css']
})
export class ApplyCoupnComponent implements OnInit {

  coupon:any = {};
  dialigData:any = {};
  disabledip:boolean = false;

  constructor(private service:DoctorServiceService, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref:MatDialogRef<ApplyCoupnComponent>, private snackbar:MatSnackBar
  ) { }

  ngOnInit() {
    // this.getCode();
    console.log('data is', this.data)
    this.dialigData = this.data;
    this.dialigData.docFinalFee = this.dialigData.docData.fee;
  }

  close(){
    this.dialogref.close();
  }

  getCode(){
    let obj:any = {};
    obj.couponcode = this.coupon.code;
    this.service.getCoupencode(obj).subscribe(res => {
      this.dialigData.couponData = res;
      console.log('couponis', res);
      if(res['status'] === true){
        console.log('==========>')
        this.disabledip = true;
        this.dialigData.docFinalFee = this.dialigData.docData.fee - this.dialigData.couponData['data']['couponamount']
      }
      else{

      }
    })
  }
  bookAppointmentToDoctor(){
    let obj:any = {};
    obj.bookedto = this.dialigData.docData._id;
    obj.time = this.dialigData.value.timeslot;
    obj.issue = this.dialigData.issue;
    obj.date = this.dialigData.date;
    if(this.dialigData.couponData && this.dialigData.couponData['data'] && this.dialigData.couponData['data']['_id']){
      obj.coupon = this.dialigData.couponData['data']['_id'];
    }
    this.service.bookAppointment(obj).subscribe(res => {
       if(res){
         this.close();
       }
       if(res['status'] === true){
         let snackbarRef = this.snackbar.open("Appointment Booked Successfully");
       }
       else if(res['status'] === false){
        let snackbarRef = this.snackbar.open("Appointment Already Booked for this date");
       }
    })
  }

}
