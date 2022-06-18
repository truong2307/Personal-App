import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { JwtHelpService } from "src/services/jwt-help.service";

@Injectable()
export class GuardAdminSide implements CanLoad, CanActivate {
  constructor(
     private router: Router,
     private userService : JwtHelpService,
      private toast: ToastrService,
      private translate: TranslateService,
     ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.userService.getUserInfo();
    if(!user){
      this.router.navigate(['/login']);
      this.toast.error(
        this.translate.instant('authentication.RequiredLogin')
      );
      return false;
    }
    if(user.role === 'Admin'){
      return true;
    }
    else {
      this.toast.error(
        this.translate.instant('authentication.RequiredAdmin')
      );
      this.router.navigate(['/login']);
    }
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    const user = this.userService.getUserInfo();
    if(!user){
      this.router.navigate(['/login']);
      this.translate.get('authentication.RequiredLogin').subscribe((translated: string) => {
        this.toast.error(
          this.translate.instant('authentication.RequiredLogin')
        );
    });
      return false;
    }
    if(user.role === 'Admin'){
      return true;
    }
    else {
      this.translate.get('authentication.RequiredAdmin').subscribe((translated: string) => {
        this.toast.error(
          this.translate.instant('authentication.RequiredAdmin')
        );
    });
    this.router.navigate(['/login']);
    }
    return false;
  }
}
