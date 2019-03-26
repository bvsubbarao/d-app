import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {

  profileObj: any = {};

  constructor(private service: DoctorServiceService, private dialogref: MatDialogRef<ProfiledetailsComponent>, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getprofiledata();
    if (localStorage.getItem('role') && localStorage.getItem('role') !== null) {
      this.profileObj.role = localStorage.getItem('role');
    }
  }

  close() {
    this.dialogref.close();
  }

  getprofiledata() {
    this.service.getProfileData().subscribe(res => {
      this.profileObj = res;
    })
  }

  updateDetails() {
    this.service.updateprofiledetails(this.profileObj).subscribe(res => {
      if (res['status'] === true) {
        let snackbarRef = this.snackbar.open(res['message']);
        this.close();
      }
    })
  }

}
