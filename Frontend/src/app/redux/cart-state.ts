import { CartModel } from "../models/cart.model";

//Cart State
export class CartState {
    public cart: CartModel = null;
    public constructor() {
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart) {
            this.cart = cart;
        }
    }
}
//Cart Action Type
export enum CartActionType {
    CartDownloaded = "CartDownloaded",
    CartClosed = "CartClosed",
    CartResetState = "CartResetState"
}
// Cart Action
export interface CartAction {
    type: CartActionType;
    payload?: any;
}

export function cartDownloadedAction(cart: CartModel): CartAction {
    return { type: CartActionType.CartDownloaded, payload: cart };
}
export function cartClosedAction(): CartAction {
    return { type: CartActionType.CartClosed };
}
export function cartResetStateAction(): CartAction {
    return { type: CartActionType.CartClosed };
}

export function cartReducer(currentState: CartState = new CartState(),
    action: CartAction): CartState {
    const newState = { ...currentState };

    switch (action.type) {
        case CartActionType.CartDownloaded:
            newState.cart = action.payload;
            sessionStorage.setItem("cart", JSON.stringify(newState.cart));
            break;
        case CartActionType.CartClosed:
        case CartActionType.CartResetState:
            newState.cart = null
            sessionStorage.removeItem("cart");
            break;
    }
    return newState;
}