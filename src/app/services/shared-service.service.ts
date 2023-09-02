import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private eventSubject = new Subject<number>();

  emitChangeQuantityEvent(data: number) {
    this.eventSubject.next(data);
  }

  getChangeQuantityEvent() {
    return this.eventSubject.asObservable();
  }

  constructor() { }
}
