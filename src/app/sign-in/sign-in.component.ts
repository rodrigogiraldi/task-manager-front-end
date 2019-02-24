import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../session.service';
import { UserService } from '../user.service';

import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: string = "";

  constructor(private router: Router, private sessionService: SessionService, private userService: UserService) { }

  ngOnInit() {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    else {
      this.user = {
        id: 0,
        email: "",
        password: ""
      }
    }
  }

  signIn() {
    if (this.isSignUpFormValid()) {
      this.userService.logIn(this.user).subscribe(
        res => {
          let loginToken = res.data;
          if (loginToken.length !== 0) {
            if (this.sessionService.logIn(loginToken)) {
              this.router.navigateByUrl("/home");
            }
          }
          else {
            this.showAlert = true;
            this.alertMessage = "Email and password entered are not correct.";
            this.alertType = "alert-danger";
          }
        });
    }
    else {
      this.showAlert = true;
      this.alertMessage = "Email and password cannot be empty.";
      this.alertType = "alert-warning";
    }
  }

  isSignUpFormValid() {
    return (this.user.email.length > 0 && this.user.password.length > 0);
  }

}
