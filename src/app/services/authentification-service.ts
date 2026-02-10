import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastService } from './toast.service';
import { RequestObject } from '../models/RequestObject';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment.prod';
import { ResponseObject } from '../models/ResponseObject';

class ConnectedUser {
  id!: number;
  username!: string;
  structure_name!: string;
  email!: string;
  isActive!: number;
  listProfiles!: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private _CODE_TOKEN_KEY = 'access_token';
  private userinfo: any
  userLoggedIn = new Subject<boolean>();

  static authenticatedUser: ConnectedUser;

  private emailSource = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router
  ) {
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      this.emailSource.next(storedEmail);
    }
  }

  setEmail(email: string) {
    this.emailSource.next(email);

    localStorage.setItem('storedEmail', email);
  }
  removeEmail() {

    localStorage.removeItem('storedEmail');

    this.emailSource.next('');
  }
  setUserLoggedIn(flag: any) {
    this.userLoggedIn.next(flag);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
  getuserinfo(): any {
    return this.userinfo;
  }


  public getCurrentUser(): any {
    return JSON.parse(localStorage.getItem("userInfo") || "");
  }

  private removeAccessToken() {
    sessionStorage.removeItem(this._CODE_TOKEN_KEY);
  }

  saveAccessToken(accessToken: any) {
    sessionStorage.setItem(this._CODE_TOKEN_KEY, accessToken);
  }

  getAccessToken() {
    return sessionStorage.getItem(this._CODE_TOKEN_KEY);
  }

  public authenticate(credentials: any): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(
      `${environment.apiUrl}/public/authenticate`,
      credentials
    )
  }

  public logoutUser(): void {
    this.removeAccessToken();
    AuthentificationService.authenticatedUser = new ConnectedUser;
    this.userLoggedIn.next(false);
  }

}
