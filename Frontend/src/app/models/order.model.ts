export class OrderModel {
    public _id: string;
    public userId: string;
    public cartId: string;
    public price: number;
    public city: string;
    public street: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public creditCard: string;
    public fourDigitsCreditCard: string;
    public invoiceNumber: string;
}
