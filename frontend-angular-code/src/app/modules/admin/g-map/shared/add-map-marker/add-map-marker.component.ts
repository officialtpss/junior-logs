import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import AppConstants from 'app/app.constants';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-add-map-marker',
  templateUrl: './add-map-marker.component.html',
  styleUrls: ['./add-map-marker.component.scss']
})
export class AddMapMarkerComponent implements OnInit {
  marker: FormGroup;
  heading: string = 'Add favorite location title';
  constructor(
    private _authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AddMapMarkerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.marker = this.formBuilder.group({
      title: ['', [Validators.required]],
      lat: [this.data?.lat ? this.data.lat : '', [Validators.required]],
      lng: [this.data?.lng ? this.data.lng : '', [Validators.required]],
      draggable: [false]
    });
  }

  submit(): void {
    if (this.marker.invalid) return;
    this._authService.post(AppConstants.USER_FAV_LOCATION, {
      title: this.marker.value.title,
      location: {
        type: 'Point',
        coordinates: [this.marker.value.lng, this.marker.value.lat]
      }
    }).subscribe({
      next: (res) => {
        this.dialog.close(this.marker.value);
        this._toaster.show('success', AppConstants.SUCCESS, res.message);
      }, error: ({ error }) => {
        this._toaster.show('error', AppConstants.ERROR, error?.message || AppConstants.COMMON_ERROR);
        return;
      }
    })
  }
}
