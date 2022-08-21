import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss']
})
export class AdminSideComponent implements OnInit {
  @ViewChild('elementContent') contentEl!: ElementRef;

  isShow: boolean = false;
  topPosToStartShowing = 100;
  onScroll(event : any) {
    const scrollPosition = this.contentEl.nativeElement.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    this.contentEl.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor() { }
  ngOnInit() {
  }

}
