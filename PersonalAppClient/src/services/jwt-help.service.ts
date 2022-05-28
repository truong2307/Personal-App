import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtHelpService {

  constructor(private jwtService: JwtHelperService) { }

  getUserInfo() : any {
    var token = localStorage.getItem('token');
    if(!token) return;
    const TokenExpriation = this.jwtService.isTokenExpired(token);
    const user = this.jwtService.decodeToken(token as any);
    if(user && TokenExpriation === false){
      return {
        userName: user['name'],
        role: user['role']
      }
    }
  }
}
