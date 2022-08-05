import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import AppConstants from 'app/app.constants';
import { AuthService } from 'app/core/auth/auth.service';
import { marker } from './marker.types';
import { AddMapMarkerComponent } from './shared/add-map-marker/add-map-marker.component';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss']
})
export class GMapComponent implements OnInit {
  markers: marker[] = [
  ]
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 30.7046;
  lng: number = 76.7179;
  constructor(
    private dialog: MatDialog,
    private _authService: AuthService,
    private _toaster: ToasterService
  ) {

  }

  ngOnInit(): void {
    this._authService.get(AppConstants.USER_FAV_LOCATION).subscribe({
      next: ({ data }) => {
        this.markers = data?.map(row => {
          return {
            ...row,
            lat: row?.location?.coordinates[1],
            lng: row?.location?.coordinates[0]
          }
        });
        
      }, error: ({ error }) => {
        this._toaster.show('error', AppConstants.ERROR, error?.message || AppConstants.COMMON_ERROR);
        return;
      }
    })
  }

  clickedMarker(label: string, index: number): void {
    // console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent | any): void  {

    const dialogRef = this.dialog.open(AddMapMarkerComponent, {
      disableClose: true,
      data: {
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false
      },
      height: 'auto',
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.markers.push(result);
      }
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent|any): void {
   
  }


}

