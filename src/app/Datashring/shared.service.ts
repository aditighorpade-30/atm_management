import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userDetail = new BehaviorSubject('');
  sharedUserDetail = this.userDetail.asObservable();

  constructor() { }

  nextMessage(userDetail: string) {
    this.userDetail.next(userDetail)
  }
}
