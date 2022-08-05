import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './generic-component/add-edit-user/add-edit-user.component';
import { TableModule } from '@fuse/components/table/table.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    SharedModule
  ]
})
export class UsersModule { }
