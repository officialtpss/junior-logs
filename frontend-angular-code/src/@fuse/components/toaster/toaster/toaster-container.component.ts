import { Component, OnInit } from '@angular/core';
import { Toast } from './toast.types';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'fuse-toaster-container',
  template: `
    <app-toaster *ngFor="let toast of toasts; let i=index" 
      [toast]="toast" [i]="i"
      (remove)="remove($event)"></app-toaster>
  `,
  styles: []
})
export class ToasterContainerComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(private toaster: ToasterService) { }

  ngOnInit() {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 8000);
      });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }
}