import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean;

  constructor(private router: Router, private sessionService: SessionService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // console.log(event.url);
      this.isLoggedIn = this.sessionService.isLoggedIn();
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.sessionService.isLoggedIn();
  }

  logOut() {
    this.sessionService.logOut();
    this.router.navigateByUrl("/sign-in");
  }
}
