import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GMapRoutingModule } from './g-map-routing.module';
import { GMapComponent } from './g-map.component';
import { AgmCoreModule } from '@agm/core';
import AppConstants from 'app/app.constants';
import { AddMapMarkerComponent } from './shared/add-map-marker/add-map-marker.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    GMapComponent,
    AddMapMarkerComponent
  ],
  imports: [
    CommonModule,
    GMapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: AppConstants.GOOGLE_APP_KEY
    }),
    SharedModule
  ]
})
export class GMapModule { }
