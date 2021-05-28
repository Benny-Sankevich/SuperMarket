import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import store from 'src/app/redux/store';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';
import { CartService } from 'src/app/services/market-services/cart.service';
import { ItemsCartService } from 'src/app/services/market-services/items-cart.service';

@Component({
  selector: 'app-client-button',
  templateUrl: './client-button.component.html',
  styleUrls: ['./client-button.component.css']
})
// component to show the client button in home page
export class ClientButtonComponent implements OnInit {

  public cart: CartModel;

  public constructor(private cartService: CartService, private notificationService: NotificationService,
    private tokenExpiredService: TokenExpiredService, private itemsCartService: ItemsCartService) { }

  public async ngOnInit(): Promise<void> {
    try {
      this.cart = await this.cartService.getCartByUser();
      if (store.getState().cartState.cart) {
        await this.itemsCartService.getAllItemsByCart();
      }
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }
}
