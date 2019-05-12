import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CCR-UI-HOSPITAL';
  token: string;
  userName: string;
  firstname: string;
  lastname: string;
  orgId: string;
  appId: string;
  constructor(
    private _authenticationService: AuthenticationService,
    private router: Router) {

}
  logout() {
    this.token = null;
    localStorage.removeItem('token');
    // localStorage.removeItem('secret');
    this.router.navigate(['/sign-in']);
  }
}
