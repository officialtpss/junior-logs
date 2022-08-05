import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';
import { ToasterContainerComponent } from './toaster/toaster-container.component';


@NgModule({
  declarations: [
    ToasterComponent,
    ToasterContainerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ToasterComponent,
    ToasterContainerComponent
  ]
})
export class ToasterModule { }
