import mongoose, { Document } from "mongoose";
export interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: number;
    discount: number;
    rating: number;
    stock: number;
    images: {
        id: string;
        url: string;
        alt: string;
    }[];
    sizes: {
        size: string;
        inStock: boolean;
    }[];
    colors: {
        name: string;
        hex: string;
        inStock: boolean;
    }[];
    reviews: {
        id: string;
        name: string;
        rating: number;
        date: string;
        comment: string;
        avatar: string;
    }[];
    features: string[];
    specifications: {
        label: string;
        value: string;
    }[];
    isNewArrival: boolean;
    isFeatured: boolean;
    isTrending: boolean;
    createdAt: string;
}
export declare const Product: mongoose.Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
//# sourceMappingURL=Product.d.ts.map