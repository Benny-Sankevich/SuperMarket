import { ProductModel } from "../models/product.model";

//Product State
export class ProductsState {
    public products: ProductModel[] = []
}
//Product Action Type
export enum ProductsActionType {
    ProductDownloaded = "ProductDownloaded",
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated",
    ProductDeleted = "ProductDeleted"
}
// Product Action
export interface ProductsAction {
    type: ProductsActionType;
    payload?: any;
}

export function productDownloadedAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.ProductDownloaded, payload: products };
}
export function productAddedAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductAdded, payload: product };
}
export function productUpdatedAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductUpdated, payload: product };
}
export function productDeletedAction(product: string): ProductsAction {
    return { type: ProductsActionType.ProductDeleted, payload: product };
}

export function productsReducer(currentState: ProductsState = new ProductsState(),
    action: ProductsAction): ProductsState {
    const newState = { ...currentState };

    switch (action.type) {
        case ProductsActionType.ProductDownloaded:
            newState.products = action.payload;
            break;

        case ProductsActionType.ProductAdded:
            newState.products.push(action.payload);
            break;

        case ProductsActionType.ProductUpdated:
            const indexToUpdate = newState.products.findIndex(p => p._id === action.payload._id);
            newState.products[indexToUpdate] = action.payload;
            break;

        case ProductsActionType.ProductDeleted:
            const indexToDelete = newState.products.findIndex(p => p._id === action.payload);
            newState.products.splice(indexToDelete, 1);
            break;
    }
    return newState;
}