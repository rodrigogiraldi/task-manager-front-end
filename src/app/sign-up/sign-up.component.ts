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
      console.log("send request");

      this.userService
        .create(this.user)
        .subscribe(
          res => {
            this.sessionService.setToken(res.data);
            this.router.navigateByUrl("/home");
          },
          error => {
            console.log(error);
          }
        )
    }
    else {
      console.log("show error message");
    }
  }

  isSignUpFormValid() {
    return (this.user.email.length > 0 && this.user.password.length > 0 && this.user.password == this.repeatEmail);
  }

}
