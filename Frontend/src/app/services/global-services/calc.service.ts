import { ItemModel } from '../../models/item.model';
import { Injectable } from '@angular/core';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  // function to calc the total price of all cart
  public getSumOfCart(): number {

    const items: ItemModel[] = store.getState().cartItemsState.cartItems;

    const sum = items.reduce((sum, current) => sum + current.totalPrice, 0);

    return +(sum).toFixed(2);
  }
}