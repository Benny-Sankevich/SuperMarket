import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { OrderService } from '../../services/market-services/order.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/market-services/products.service';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { OrderModel } from 'src/app/models/order.model';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public totalProducts: number = 0;
  public totalOrders: number = 0;
  public user: UserModel = store.getState().authState.user;
  public unsubscribeStore: Unsubscribe;
  public order: OrderModel;

  public constructor(private productsService: ProductsService, private ordersService: OrderService,
    private notificationService: NotificationService, private tokenExpiredService: TokenExpiredService) { }

  public async ngOnInit(): Promise<void> {
    try {
      //get total products in website
      this.totalProducts = await this.productsService.getTotalProductsAsync();
      //get total orders in website
      this.totalOrders = await this.ordersService.getTotalOrdersAsync();
      if (store.getState().authState.user) {
        this.order = await this.ordersService.getOrderByUser();
      }
      this.unsubscribeStore = store.subscribe(async () => {
        this.user = store.getState().authState.user;
        if (store.getState().authState.user) {
          this.order = await this.ordersService.getOrderByUser();
        }
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
}