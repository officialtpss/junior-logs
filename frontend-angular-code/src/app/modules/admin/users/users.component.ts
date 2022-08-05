import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { column, userAction } from '@fuse/components/table/table.types';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import { ApiServices } from '@fuse/services/api/api.services';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import AppConstants from 'app/app.constants';
import { User } from 'app/core/user/user.types';
import { AddEditUserComponent } from './generic-component/add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data: Array<User> = [];
  ADD_USER: string = AppConstants.ADD_USER;
  USER_ROLES: any[] = AppConstants.USER_ROLES;
  columns: Array<column> = [
    {
      columnDef: 'firstName',
      header: 'First Name',
      sort: true,
      isDisplayed: true,
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      sort: true,
      isDisplayed: true,
    },
    {
      columnDef: 'email',
      header: 'Email',
      sort: true,
      isDisplayed: true,
    },
    {
      columnDef: 'address',
      header: 'City',
      sort: true,
      isDisplayed: true,
    },
    {
      columnDef: 'fullRole',
      header: 'Role',
      sort: false,
      isDisplayed: true,
    }
  ];
  filterValue: string = '';
  userActions: Array<userAction | any> = [
    {
      type: 'edit',
      hide: false
    },
    {
      type: 'delete',
      hide: false, 
    }

  ]
  constructor(
    private service: ApiServices,
    private dialog: MatDialog,
    private confirmDialog: FuseConfirmationService,
    private toaster: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.service.get(AppConstants.USER).subscribe({
      next: (res) => {
        this.data = res.data?.map((user: User | any) => {
          user.fullRole = this.USER_ROLES?.find(row => row.value == user.role)?.name || user.role
          return user
        });
      }, error: ({ error }) => {
        error?.message && this.toaster.show('error', AppConstants.ERROR, error?.message);
      }
    });
    
  }

  tableAction({ actionName, row }) {
    switch (actionName) {
      case 'add':
        this.openDialog(actionName, row);
        break;
      case 'edit':
        this.openDialog(actionName, row);
        break;
      case 'delete':
        this.onDeleteDetails(row);
        break;
      default:
        break;
    }
  }

  onDeleteDetails(row): void {
    this.confirmDialog.open({ title: AppConstants.DELETE_ALERT, message: AppConstants.DELETE_USER_ALERT }).afterClosed().subscribe(result => {
     
      if (result != 'cancelled') {
        this.service.delete(`${AppConstants.USER}/${row._id}`).subscribe({
          next: (res) => {
            this.fetchUserDetails()
            this.toaster.show('success', AppConstants.SUCCESS, AppConstants.USER_DELETE_SUCCESS);
          }, error: ({ error }) => {
            error?.message && this.toaster.show('error', AppConstants.ERROR, error?.message);
          }
        });
      }
    });
  }

  openDialog(actionName: string, data: User = null) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      disableClose: true,
      data: { 'actionName': actionName, 'data': data },
      height: 'auto',
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      result && this.fetchUserDetails();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.filterValue = filterValue?.trim().toLowerCase();
  }
}
