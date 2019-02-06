import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctorAppointment';
  constructor(public router:Router){
    if(localStorage.getItem('token') ===null || localStorage.getItem('token') === undefined){
      this.router.navigate(['']);
      localStorage.clear();
    }
  }
}
