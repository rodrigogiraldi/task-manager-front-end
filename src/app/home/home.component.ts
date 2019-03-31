import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../session.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService, private taskService: TaskService) { }

  ngOnInit() {
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigateByUrl("/sign-in");
    }
    else {
      this.taskService.currentUserHasAny().subscribe(
        res => {
          if (res.data === true) {
            this.router.navigateByUrl("/search-task");
          }
        }
      );
    }
  }
}
