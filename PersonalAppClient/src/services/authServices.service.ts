import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/model/User.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServicesService {

  constructor(private httpClient: HttpClient) { }

    loginUser(user?: UserLogin) : Observable<UserLogin>{
    return this.httpClient.post<UserLogin>(environment.baseUri + 'user/login', user);
  }

}
