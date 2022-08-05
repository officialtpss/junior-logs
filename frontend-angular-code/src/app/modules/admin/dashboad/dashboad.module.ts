import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboadRoutingModule } from './dashboad-routing.module';
import { DashboadComponent } from './dashboad.component';


@NgModule({
  declarations: [
    DashboadComponent
  ],
  imports: [
    CommonModule,
    DashboadRoutingModule,
  ]
})
export class DashboadModule { }
