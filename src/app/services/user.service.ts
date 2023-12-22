import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import {UserDto} from "../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<UserDto[]>("http://localhost:8080/api/authenticate/get-all-users")
  }


  deleteUser(email: string | undefined) {
    return this.httpClient.delete(`http://localhost:8080/api/authenticate/delete-user/${email}`);
  }
}
