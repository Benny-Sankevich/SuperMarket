import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsCartService } from 'src/app/services/market-services/items-cart.service';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';
import { environment } from 'src/environments/environment';
import { CartEditAmountComponent } from '../cart-edit-amount/cart-edit-amount.component';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {

  @Input()
  public cartItem: ItemModel;
  @Input()
  public enableChangesButtons: boolean;
  public imageUrl: string;

  constructor(private notificationService: NotificationService, private itemsCartService: ItemsCartService,
    public dialog: MatDialog, private tokenExpiredService: TokenExpiredService) { }

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.cartItem.product.imageName;
  }

  // function to delete item shopping from cart
  public async deleteItemFromCart(): Promise<void> {
    try {
      await this.itemsCartService.deleteItem(this.cartItem._id);
      this.notificationService.success("The item was removed from the cart.");
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //where user choose to change amount of the item shopping
  public editItemCartAmount(): void {
    this.dialog.open(CartEditAmountComponent, { data: this.cartItem });
  }
}
