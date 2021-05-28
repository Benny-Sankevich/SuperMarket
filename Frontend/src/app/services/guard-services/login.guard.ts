import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  public constructor(private notificationService: NotificationService, private router: Router) { }

  //check if user is client and if user not client or not login block the page
  public canActivate(): boolean {
    const user = store.getState().authState.user;
    if (user?.isAdmin === 'no') {
      return true;
    }
    if (!user) {
      this.notificationService.error("You are not logged in!");
    }
    else {
      this.notificationService.error("You don't authorized to access that page");
    }
    this.router.navigateByUrl("/");
    return false;
  }
}