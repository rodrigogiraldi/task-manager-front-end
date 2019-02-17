import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
  }

}
