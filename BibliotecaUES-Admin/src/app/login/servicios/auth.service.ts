import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from './'

@Injectable()
export class AuthService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  login(username: string, password: string): Observable<any> {
    let q = JSON.stringify({ email: username, password: password });
    let url = this.baseUrl + '/authentication/login';

    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        return {user: this.mapUser(r['user']), token: r['token']};
      }
    );
  }

  verify(token:string):Observable<User>{
    let url = this.baseUrl + "/authentication/verify/" + token;

    return this.http.get(url).map(
      (r: Response)=>{
        return this.mapUser(r);
      }
    );
  }

  private mapUser(r: any): User{
    let user = new User();
    user.id = 0;
    user.email = r['email'];
    user.fullname = r['fullname'];
    user.group = r['group'];
    user.policies = r['policies'];

    return user;
  }

}
