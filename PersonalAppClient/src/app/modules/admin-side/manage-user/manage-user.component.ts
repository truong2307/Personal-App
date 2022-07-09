import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserForAdminManagerDto } from 'src/shared/model/User.interface';
import { GetUsersAction } from 'src/stores/manage-user/manage-user.action';
import { manageUserSelector } from '../../../../stores/manage-user/manage-user.selector';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users : UserForAdminManagerDto[] = [];

  constructor(
    private store: Store,
    private loader: NgxUiLoaderService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUsersAction());
    this.loader.start();
    this.store.pipe(select(manageUserSelector)).subscribe(
      result => {
        this.users = result.items;
        this.loader.stop();
      }
    );
  }

  editUser(data: UserForAdminManagerDto){
    var modalRef = this.modalService.open(EditUserComponent, {size: 'md'});
    modalRef.componentInstance.userInfo = data;
  }
}
