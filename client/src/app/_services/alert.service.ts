import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // Alert message is cleared when the route changes unless when keepAfterRouteChange=true
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // if keepAfterRouteChange=true, keep alert for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // otherwise, clear alert message
          this.clear();
        }
      }
    });
  }

  getAlertMessage(): Observable<any> {
    // returning an observable when getAlert() is called so that we can subscribe to it.
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }
  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    // The alert message is cleared by saving an empty message in the Subject
    this.subject.next();
  }
}
