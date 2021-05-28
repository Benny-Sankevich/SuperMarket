import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  public constructor(private notificationService: NotificationService, private router: Router) { }

  //check if cart is empty and block the order page
  public canActivate(): boolean {
    if (store.getState().cartItemsState.cartItems?.length > 0) {
      return true;
    }
    if (store.getState().authState.user?.isAdmin === 'no') {
      if (store.getState().cartState.cart !== null) {
        this.router.navigateByUrl("/market");
        this.notificationService.error("Nothing in shopping cart please start shopping");
      }
      else {
        this.router.navigateByUrl("/");
        this.notificationService.error("Nothing in shopping cart please start shopping");
      }
    }
    return false;
  }
}
