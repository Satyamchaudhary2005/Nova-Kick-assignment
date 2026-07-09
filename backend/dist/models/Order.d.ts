import mongoose, { Document } from "mongoose";
export interface IOrder extends Document {
    id: string;
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
        image: string;
    }[];
    shippingInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    status: string;
    createdAt: string;
}
export declare const Order: mongoose.Model<IOrder, {}, {}, {}, Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IOrder>;
//# sourceMappingURL=Order.d.ts.map