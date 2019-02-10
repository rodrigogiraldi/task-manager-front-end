import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  repeatEmail: string;

  constructor(private userService: UserService) {
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
            console.log(res);
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
