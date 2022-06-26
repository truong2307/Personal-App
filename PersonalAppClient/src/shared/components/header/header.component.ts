import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from 'src/services/signalr-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router : Router,
    private signalRservice : SignalRService,
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('token');
    this.toastr.success(
      'Log out success'
    )
    this.router.navigate(['/login']);
    this.signalRservice.disconnectHub();
  }
}
