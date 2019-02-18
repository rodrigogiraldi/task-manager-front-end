import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { SessionService } from '../session.service';

import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  repeatEmail: string;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: string = "";

  constructor(private router: Router, private userService: UserService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.user = {
      id: 0,
      email: "",
      password: ""
    }
    this.repeatEmail = "";
  }

  signUp() {
    if (this.isSignUpFormValid()) {
      this.userService
        .create(this.user)
        .subscribe(
          res => {
            this.sessionService.setToken(res.data);
            this.router.navigateByUrl("/home");
          },
          error => {
            this.setUpAlert(true, "alert-danger", error.error.data);
          }
        )
    }
    else {
      if (this.user.password !== this.repeatEmail) {
        this.setUpAlert(true, "alert-warning", "Passwords do not match");
      }
    }
  }

  isSignUpFormValid() {
    return (this.user.email.length > 0 && this.user.password.length > 0 && this.user.password == this.repeatEmail);
  }

  setUpAlert(showAlert: boolean, alertType?: string, alertMessage?: string) {
    this.showAlert = showAlert;

    if (showAlert) {
      this.alertType = alertType;
      this.alertMessage = alertMessage;
    }
  }
}
