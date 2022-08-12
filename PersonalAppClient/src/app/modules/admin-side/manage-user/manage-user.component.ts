import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserForAdminManagerDto } from 'src/shared/model/user.interface';
import { GetUsersAction, UpdateUsersAction } from 'src/stores/manage-user/manage-user.action';
import { manageUserSelector } from '../../../../stores/manage-user/manage-user.selector';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  users : UserForAdminManagerDto[] = [];
  totalItem = 0;
  pageSize = 10;
  pageIndex = 0;
  pageTotalOption = [10, 20, 30];
  no = 0;


  constructor(
    private store: Store,
    private loader: NgxUiLoaderService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUsersAction(
      {pageIndex :this.pageIndex, pageSize: this.pageSize}
      ));

    this.store.pipe(select(manageUserSelector)).subscribe(
      result => {
        this.users = result.items;
        this.totalItem = result.totalItem
      }
    );
  }


  editUser(data: UserForAdminManagerDto){
    var modalRef = this.modalService.open(EditUserComponent, {size: 'md'});
    modalRef.componentInstance.userInfo = data;

    modalRef.componentInstance.dataUser.subscribe((data : any) => {
      manageUserSelector.release();
      this.store.dispatch(new UpdateUsersAction(data));
    })
  }

  changePageEvent(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex

    this.store.dispatch(new GetUsersAction(
      {pageIndex :this.pageIndex, pageSize: this.pageSize}
    ))
  }

  test(){
    return this.no++;
  }
}
