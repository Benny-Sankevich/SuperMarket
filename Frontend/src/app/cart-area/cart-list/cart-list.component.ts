import { Component, Input, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ItemModel } from 'src/app/models/item.model';
import store from 'src/app/redux/store';
import { CalcService } from 'src/app/services/global-services/calc.service';
import { ItemsCartService } from 'src/app/services/market-services/items-cart.service';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input()
  public enableChangesButtons: boolean;

  public cartItems: ItemModel[];
  public unsubscribeStore: Unsubscribe;
  public sumOfCart: number;
  public itemCartSearch: string = "";

  public constructor(private itemsCartService: ItemsCartService, private calcService: CalcService,
    private tokenExpiredService: TokenExpiredService, private notificationService: NotificationService) { }

  public async ngOnInit(): Promise<void> {
    try {
      if (store.getState().cartState.cart) {
        this.cartItems = await this.itemsCartService.getAllItemsByCart();
        this.sumOfCart = this.calcService.getSumOfCart();
      }
      this.unsubscribeStore = store.subscribe(() => {
        this.cartItems = store.getState().cartItemsState.cartItems;
        this.sumOfCart = this.calcService.getSumOfCart();
      });
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //function to show yellow background item name where user search item name in order page
  public async searchItemInCart() {
    this.cartItems.map(i => {
      if (this.itemCartSearch !== "" && i.product.name.toLowerCase().includes(this.itemCartSearch.toLowerCase())) {
        i.background = { background: 'yellow' }
      }
      else {
        i.background = { background: 'lightsteelblue' }
      }
    });
    this.itemCartSearch = "";
  }

  public ngOnDestroy(): void {
    //where component destroy return the regular background to item name
    this.cartItems.map(i => { i.background = { background: 'lightsteelblue' } })
    this.unsubscribeStore();
  }
}
