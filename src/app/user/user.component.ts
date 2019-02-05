import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';

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

  constructor(private service: CommonService) {
  }

  ngOnInit() {
    this.service.getSpecialistList().subscribe(res => {
      this.specialistList = res;
      console.log(':::', this.specialistList);
    });

  }

  /*
  * collect the patient data
  * */
  onSubmitPatientForm() {
    console.log('>>>>>', this.requestObject);
    if (this.requestObject.specialistId !== undefined) {
      this.service.getHospitalList(this.requestObject.specialistId).subscribe(res => {
        this.hospitalList = res;
        console.log(':::', this.hospitalList);

      });
    }
  }


}
