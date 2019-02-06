import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {

  profileObj:any = {};

  constructor(private service: DoctorServiceService,private dialogref:MatDialogRef<ProfiledetailsComponent>) { }

  ngOnInit() {
    this.getprofiledata();
  }

  close(){
    this.dialogref.close();
  }

  getprofiledata(){
    this.service.getProfileData().subscribe(res => {
      console.log('profile data is', res);
      this.profileObj = res;
    })
  }

  updateDetails(){
    this.service.updateprofiledetails(this.profileObj).subscribe(res => {
      console.log('updated products', res);
    })
  }

}
