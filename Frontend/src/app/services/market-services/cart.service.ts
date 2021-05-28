import { CartModel } from '../../models/cart.model';
import { cartClosedAction, cartDownloadedAction } from '../../redux/cart-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../../redux/store';
import { itemResetStateAction } from '../../redux/cartItems.state';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public constructor(private http: HttpClient) { }

  // function to get cart by user
  public async getCartByUser(): Promise<CartModel> {
    const userId = store.getState().authState.user._id;
    if (store.getState().cartState.cart === null) {
      const cart = await this.http.get<CartModel>(environment.cartUrl + userId).toPromise();
      store.dispatch(cartDownloadedAction(cart));
    }
    return store.getState().cartState.cart;
  }

  // function to add new cart
  public async addCart(): Promise<CartModel> {

    const cart = new CartModel();
    cart.userId = store.getState().authState.user._id;
    cart.creationDate = new Date();
    cart.isOpenCart = true;

    const addedCart = await this.http.post<CartModel>(environment.cartUrl, cart).toPromise();
    store.dispatch(cartDownloadedAction(addedCart));
    return addedCart;
  }

  // function to close the status cart when user create order
  public async closeCart(): Promise<CartModel> {

    const cartId = store.getState().cartState.cart._id;

    const cart = new CartModel();
    cart.userId = store.getState().authState.user._id;
    cart.creationDate = store.getState().cartState.cart.creationDate;
    cart.isOpenCart = false;

    const closedCart = await this.http.put<CartModel>(environment.cartUrl + cartId, cart).toPromise();
    store.dispatch(cartClosedAction());
    store.dispatch(itemResetStateAction());

    return closedCart;
  }
}