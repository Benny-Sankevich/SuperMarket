import { ItemModel } from "../models/item.model";

//Item State
export class CartItemsState {
    public cartItems: ItemModel[] = [];
    public constructor() {
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartItems) {
            this.cartItems = cartItems;
        }
    }
}
//Item Action Type
export enum ItemsActionType {
    ItemDownloaded = "ItemsDownloaded",
    ItemAdded = "ItemAdded",
    ItemUpdated = "ItemUpdated",
    ItemDeleted = "ItemDeleted",
    ItemResetState = "ItemResetState"
}
// item Action
export interface ItemsAction {
    type: ItemsActionType;
    payload?: any;
}

export function itemDownloadedAction(items: ItemModel[]): ItemsAction {
    return { type: ItemsActionType.ItemDownloaded, payload: items };
}
export function itemAddedAction(item: ItemModel): ItemsAction {
    return { type: ItemsActionType.ItemAdded, payload: item };
}
export function itemUpdatedAction(item: ItemModel): ItemsAction {
    return { type: ItemsActionType.ItemUpdated, payload: item };
}
export function itemDeletedAction(item: string): ItemsAction {
    return { type: ItemsActionType.ItemDeleted, payload: item };
}
export function itemResetStateAction(): ItemsAction {
    return { type: ItemsActionType.ItemResetState };
}

export function itemsReducer(currentState: CartItemsState = new CartItemsState(),
    action: ItemsAction): CartItemsState {
    const newState = { ...currentState };

    switch (action.type) {
        case ItemsActionType.ItemDownloaded:
            newState.cartItems = action.payload;
            break;

        case ItemsActionType.ItemAdded:
            newState.cartItems.push(action.payload);
            break;

        case ItemsActionType.ItemUpdated:
            const indexToUpdate = newState.cartItems.findIndex(i => i._id === action.payload._id);
            newState.cartItems[indexToUpdate] = action.payload;
            break;

        case ItemsActionType.ItemDeleted:
            const indexToDelete = newState.cartItems.findIndex(i => i._id === action.payload);
            newState.cartItems.splice(indexToDelete, 1);
            break;
        case ItemsActionType.ItemResetState:
            newState.cartItems = [];
            break;
    }
    sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
    return newState;
}