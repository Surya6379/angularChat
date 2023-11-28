import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiURL = 'http://localhost:3001';

  loggedIn : boolean = false;
  loggedInUser !: any;

  constructor(private http:HttpClient) { }

  registerUser(userData:any){
    return this.http.post(`${this.apiURL}/users`,userData);
  }

  loginIser(userCreds:any){
    return this.http.post(`${this.apiURL}/userLogin`,userCreds);
  }
}
