import { ProductModel } from './product.model';
export class ItemModel {
    public _id: string;
    public productId: string;
    public cartId: string;
    public amount: number;
    public price: number;
    public totalPrice: number;
    public product: ProductModel;
    public background: Object;
}