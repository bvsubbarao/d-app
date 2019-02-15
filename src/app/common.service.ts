import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  auth_token = '';
  private baseAPI = 'http://192.168.1.2:9000';
  // Passing the token in headers
  header = new HttpHeaders({'Authorization': this.auth_token});

  constructor(private http: HttpClient) {
  }

  /*
  * To get the specialist details
  * */
  getSpecialistList() {
    return this.http.get(this.baseAPI + '/api/specialists/getallspecialists');
  }

  /*
    * To get the specialist details
    * */
  getHospitalList(id: string) {
    return this.http.get(this.baseAPI + '/api/hospitals/getallhospitals/' + id, {headers: this.getHeader()});
  }

  storeUserToken(): any {
    return 'Bearer ' + localStorage.getItem('token');
  }

  getHeader(): any {
    return new HttpHeaders({'Authorization': this.storeUserToken()});
  }
}
