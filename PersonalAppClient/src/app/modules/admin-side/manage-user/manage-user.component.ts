import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserForAdminManagerDto } from 'src/shared/model/User.interface';
import { GetUsersAction } from 'src/stores/manage-user/manage-user.action';
import { manageUserSelector } from '../../../../stores/manage-user/manage-user.selector';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = ['Full Name', 'User Name', 'Role', 'Email'];
  users : UserForAdminManagerDto[] = [];

  constructor(
    private store: Store,
    private loader: NgxUiLoaderService,
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


}
