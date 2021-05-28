import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../../models/order.model';
import store from '../../redux/store';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public constructor(private http: HttpClient, private cartService: CartService) { }

  // function to get last order of user
  public async getOrderByUser(): Promise<OrderModel> {
    const userId = store.getState().authState.user._id;
    const oldOrder = await this.http.get<OrderModel>(environment.ordersUrl + "order/" + userId).toPromise();
    return oldOrder;
  }

  // function to create a new order
  public async addOrder(order: OrderModel, user: UserModel): Promise<OrderModel> {
    order.userId = user._id;
    order.cartId = store.getState().cartState.cart._id;
    order.orderDate = new Date();
    order.fourDigitsCreditCard = order.creditCard.slice(order.creditCard.length - 4);
    order.city = user.city;
    order.street = user.street;

    const addedOrder = await this.http.post<OrderModel>(environment.ordersUrl, order).toPromise();
    this.cartService.closeCart();
    return addedOrder;
  }

  // function to get sum of orders in website
  public async getTotalOrdersAsync(): Promise<number> {
    const totalOrders = await this.http.get<number>(environment.ordersUrl + "total-orders").toPromise();
    return totalOrders;
  }

  // function to check if delivery date that user choose if have 3 orders with same date
  public async checkDeliveryDateAvailableAsync(deliveryDate: string): Promise<boolean> {
    const availableDeliveryDate = await this.http.post<boolean>(environment.checkDeliveryDateUrl, { deliveryDate }).toPromise();
    return availableDeliveryDate;
  }
}