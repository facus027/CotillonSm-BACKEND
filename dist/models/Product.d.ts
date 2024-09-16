import { Model } from 'sequelize-typescript';
interface IProduct {
    name: string;
    description: string;
    price: number;
    availability: boolean;
    image: string;
    category: string;
}
declare class Product extends Model<IProduct, IProduct> {
    name: string;
    description: string;
    price: number;
    availability: boolean;
    image: string;
    category: string;
}
export default Product;
