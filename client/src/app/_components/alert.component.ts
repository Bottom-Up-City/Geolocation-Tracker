import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  message: any;
  private subscription!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .getAlertMessage()
      .subscribe((message: any) => {
        switch (message && message.text) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }
        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
