import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SessionService } from './session.service';

import { Task } from './task';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  create(task: Task) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.getToken()
      })
    };

    return this.httpClient.post<any>(Config.API_URL + "/task", task, httpOptions);
  }

  getAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.getToken()
      })
    };

    return this.httpClient.get<any>(Config.API_URL + "/task", httpOptions);
  }

  currentUserHasAny() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.getToken()
      })
    };

    return this.httpClient.get<any>(Config.API_URL + "/task/has-any", httpOptions);
  }
}
