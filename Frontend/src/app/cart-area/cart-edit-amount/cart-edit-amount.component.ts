import { NotificationService } from '../../services/global-services/notifications.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsCartService } from 'src/app/services/market-services/items-cart.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-cart-edit-amount',
  templateUrl: './cart-edit-amount.component.html',
  styleUrls: ['./cart-edit-amount.component.css']
})
export class CartEditAmountComponent implements OnInit {

  public amount: number;

  public constructor(private itemsCartService: ItemsCartService, private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public cartItem: ItemModel, public dialog: MatDialog, private tokenExpiredService: TokenExpiredService) { }

  public ngOnInit(): void {
    this.amount = this.cartItem.amount;
  }

  // function to update amount of item shopping
  public async updateItemInCart(): Promise<void> {
    try {
      this.cartItem.amount = this.amount;
      await this.itemsCartService.updateItem(this.cartItem);
      this.notificationService.success("The item has been updated in cart.");
      this.dialog.closeAll();
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //change amount if user choose minus
  public amountMinus(): void {
    if (this.amount === 1) {
      return;
    }
    this.amount--;
  }
  //change amount if user choose plus
  public amountPlus(): void {
    this.amount++;
  }
}