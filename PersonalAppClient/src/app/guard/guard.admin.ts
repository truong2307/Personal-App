import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { JwtHelpService } from "src/shared/jwtHelper/jwt-help.service";

@Injectable()
export class GuardAdminSide implements CanLoad, CanActivate {
  constructor(
     private router: Router,
     private userService : JwtHelpService,
    private toast: ToastrService

     ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.userService.getUserInfo();
    if(!user){
      this.router.navigate(['/login'])
      this.toast.error('Bạn không có quyền truy cập admin');
      return false;
    }
    if(user.role === 'Admin'){
      return true;
    }
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    const user = this.userService.getUserInfo();
    if(!user){
      this.router.navigate(['/login'])
      this.toast.error('Bạn không có quyền truy cập admin');
      return false;
    }
    if(user.role === 'Admin'){
      return true;
    }
    return false;
  }
}
