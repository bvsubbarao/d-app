import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfiledetailsComponent } from '../profiledetails/profiledetails.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  flagObj: any = {};

  constructor(private datashare:DatashareService,private router:Router, private dialog:MatDialog) {

    console.log('role ',localStorage.getItem('role'));
    if(localStorage.getItem('role') && localStorage.getItem('role') !== null){
      this.flagObj.role = localStorage.getItem('role');
    }
    this.datashare.getRole().subscribe(res => {
      // console.log('---->', res)
      this.flagObj.role = res['text'];
      console.log(this.flagObj.role)
    })
    console.log('---->', this.flagObj.role)
    // if(this.flagObj.role === 'doctor'){
    //   // console.log('role is', this.flagObj.role)
    //   this.flagObj.login = 'login';
    // }
    
   }

  ngOnInit() {

  }
  logout(){
    localStorage.clear();
    this.flagObj.role = null;
    this.router.navigate(['']);
    console.log(this.flagObj.role)
  }
  opendialog(){
    this.dialog.open(ProfiledetailsComponent);
  }

}
