import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  create(user: User) {
    return this.httpClient.post<any>(Config.API_URL + "/user", user);
  }

  logIn(user: User) {
    return this.httpClient.post<any>(Config.API_URL + "/user/login", user);
  }
}
