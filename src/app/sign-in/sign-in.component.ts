import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../service/authentication.service';

import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory, DialogRef } from 'angular2-modal';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage: string;
    credentials: any = {"email":"","password":""};

    constructor(
        private _authenticationService: AuthenticationService,
        private _router: Router,
        ) {
        //***Is user login?
        if(localStorage.getItem('token') != null){
          this._router.navigateByUrl('/create');
        }
        //***
    }
    signin() {
    this._authenticationService.signin(this.credentials)/*{"username":"admin","password":"admin"}*/
        .subscribe(
            result => {
                this._router.navigate(['create']);
                // console.log("uilog getUserInfo ");
                // this._authenticationService.getUserInfo()/*{"username":"admin","password":"admin"}*/
                //     .subscribe(
                //         resultUser => {
                //         //   this.progressDialog.close();
                //         //   this._router.navigate(['rpt-list']);
                //         },
                //         error => {
                //         this.progressDialog.close();
                //         this.errorMessage = error;
                //     }
                //     );
            },
            error => {
                console.log("login error");
                this.errorMessage = "Incorrect email or password: " + error;
          }
        );
}

  ngOnInit() {
  }

}
