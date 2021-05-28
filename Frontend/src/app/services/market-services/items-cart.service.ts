import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { itemAddedAction, itemDeletedAction, itemDownloadedAction, itemUpdatedAction } from '../../redux/cartItems.state';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ItemsCartService {

  public constructor(private http: HttpClient) { }

  // function to get all items per cart
  public async getAllItemsByCart(): Promise<ItemModel[]> {

    if (store.getState().cartItemsState.cartItems.length === 0) {
      const cartItems = await this.http.get<ItemModel[]>(environment.itemsUrl + store.getState().cartState.cart._id).toPromise();
      store.dispatch(itemDownloadedAction(cartItems));
    }
    return store.getState().cartItemsState.cartItems;
  }

  // function to add item in cart
  public async addItem(item: ItemModel): Promise<ItemModel> {

    const myFormData = new FormData();
    myFormData.append("productId", item.product._id);
    myFormData.append("cartId", store.getState().cartState.cart._id);
    myFormData.append("amount", item.amount.toString());
    myFormData.append("price", item.product.price.toString());
    myFormData.append("totalPrice", (item.amount * item.product.price).toString());

    const addedItem = await this.http.post<ItemModel>(environment.itemsUrl, myFormData).toPromise();
    addedItem.product = item.product;
    store.dispatch(itemAddedAction(addedItem));
    return addedItem;
  }

  // function to update item in cart
  public async updateItem(item: ItemModel): Promise<ItemModel> {

    const myFormData = new FormData();
    myFormData.append("productId", item.product._id);
    myFormData.append("cartId", store.getState().cartState.cart._id);
    myFormData.append("amount", item.amount.toString());
    myFormData.append("price", item.product.price.toString());
    myFormData.append("totalPrice", (item.amount * item.product.price).toString());

    const updatedItem = await this.http.put<ItemModel>(environment.itemsUrl + item._id, myFormData).toPromise();
    updatedItem.product = item.product;
    store.dispatch(itemUpdatedAction(updatedItem));
    return updatedItem;
  }

  // function to delete item from cart
  public async deleteItem(_id: string): Promise<void> {
    await this.http.delete<ItemModel>(environment.itemsUrl + _id).toPromise();
    store.dispatch(itemDeletedAction(_id));
  }
}