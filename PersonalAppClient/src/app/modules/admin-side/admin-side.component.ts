import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss']
})
export class AdminSideComponent implements OnInit {

  constructor(private loader: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

}
