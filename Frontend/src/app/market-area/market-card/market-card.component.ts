import { NotificationService } from '../../services/global-services/notifications.service';
import { ItemModel } from './../../models/item.model';
import { ProductModel } from '../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { ItemsCartService } from 'src/app/services/market-services/items-cart.service';
import { Unsubscribe } from 'redux';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.css']
})
export class MarketCardComponent implements OnInit {

  //get product data from market list
  @Input()
  public product: ProductModel;
  public amount = 1;
  public imageUrl: string;
  public item = new ItemModel();
  public items: ItemModel[] = store.getState().cartItemsState.cartItems;
  public unsubscribeStore: Unsubscribe;

  public constructor(private notificationService: NotificationService, private itemsCartService: ItemsCartService,
    private tokenExpiredService: TokenExpiredService) { }

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.product.imageName;
    this.unsubscribeStore = store.subscribe(() => {
      this.items = store.getState().cartItemsState.cartItems;
    });
  }
  //on click add item to cart
  public addItemToCart(): void {
    const currentItem = this.items.find(i => i.productId === this.product._id);
    //If the item is in the shopping cart - update item in cart
    if (currentItem) {
      this.updateItemInCart(currentItem);
      return;
    }
    //If the item is not in the shopping cart
    this.addItemInCart();
  }

  //add item shopping in cart
  public async addItemInCart(): Promise<void> {
    try {
      this.item.amount = this.amount;
      this.item.product = this.product;

      await this.itemsCartService.addItem(this.item);
      this.amount = 1;
      this.notificationService.success("The item has been added in cart.");
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //update item shopping in cart
  public async updateItemInCart(currentItem: ItemModel): Promise<void> {
    try {
      this.item._id = currentItem._id;
      this.item.amount = (this.amount + currentItem.amount);
      this.item.totalPrice = (this.item.amount * this.product.price);
      this.item.product = this.product;

      await this.itemsCartService.updateItem(this.item);
      this.amount = 1;
      this.notificationService.success("The item has been updated in cart.");
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //change when user change amount minus
  public amountMinus(): void {
    if (this.amount === 1) {
      return;
    }
    this.amount--;
  }

  //change when user change amount plus
  public amountPlus(): void {
    this.amount++;
  }

  public ngOnDestroy(): void {
    this.unsubscribeStore();
  }
}
