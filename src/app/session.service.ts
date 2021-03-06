import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken(): string {
    return localStorage.getItem("sessionToken");
  }

  setToken(token: string) {
    localStorage.setItem("sessionToken", token);
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    return (token !== null && token !== undefined && token.length > 0);
  }

  logIn(token: string): boolean {
    if (token) {
      this.setToken(token);
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("sessionToken");
  }
}
