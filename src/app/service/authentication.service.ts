import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user = window['user'];

  private _signinURL = environment.backendBaseUrl + '/user/login'; // '/api/auth/signin'

  constructor(private http: Http) {
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));
  }

  isLoggedIn(): boolean {
    return (!!this.user);
  }


  signin(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._signinURL, body, options)
        .map(res => {
          const data = res.json();
          console.log("data : " + JSON.stringify(data));
          if (data.token) {
            // localStorage.setItem('id', data.id);
            localStorage.setItem('token', data.token);
          }
        })
        .catch(this.handleError);
  }
  // getUserInfo(): Observable<any> {
  //     const url = environment.backendBaseUrl + 'users/' + localStorage.getItem('userId');
  //     let headers = new Headers();
  //     this.createAuthorizationHeader(headers);
  //     return this.http.get(url, {
  //       headers: headers
  //     }).map( (res: Response) => {
  //       console.log("uilog userData " + JSON.stringify(res));
  //       const userData = res.json();
  //       localStorage.setItem('userName', userData.username);
  //     })
  //     .catch(this.handleError);
  // }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }
}
