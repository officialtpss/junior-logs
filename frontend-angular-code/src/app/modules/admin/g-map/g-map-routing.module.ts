import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GMapComponent } from './g-map.component';

const routes: Routes = [
  {
    path: '',
    component: GMapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GMapRoutingModule { }
