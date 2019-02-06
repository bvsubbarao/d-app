import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  private role = new Subject<any>();

  constructor() { }

  sendRole(message: string) {
    this.role.next({ text: message });
  }

  clearRole() {
    this.role.next();
  }

  getRole(): Observable<any> {
    return this.role.asObservable();
  }
}
