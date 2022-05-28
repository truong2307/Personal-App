import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserRegister } from 'src/app/model/User.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServices {

  constructor(private httpClient: HttpClient) { }

  loginUser(user?: UserLogin) : Observable<UserLogin>{
    return this.httpClient.post<UserLogin>(environment.baseUri + 'user/login', user);
  }

  registerUser(user?: UserRegister) : Observable<any>{
    console.log(user);

    return this.httpClient.post<any>(environment.baseUri + 'user/register', user);
  }

}
