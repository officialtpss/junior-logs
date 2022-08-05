import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './dashboad.component';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'home'},
  {
    path: 'places',
    loadChildren: () => import('./../g-map/g-map.module').then(m => m.GMapModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./../users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'home',
    component: DashboadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboadRoutingModule { }
