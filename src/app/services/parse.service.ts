import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() { }

  getCustomArray(cols: string[], data: any[]) {
    let response: any[] = [];
    data.forEach(d=> {
      response.push(this.getCustomObject(cols, d))
    })

    return response;
  }

  getCustomObject(cols: string[], data: any) {
    let obj: any = {}
    let idx: number = 0;
    for (let [key, value] of Object.entries(data)) {
      obj[cols[idx]] = value
      idx += 1;
    }

    console.log(obj)
    return obj;
  }
}
