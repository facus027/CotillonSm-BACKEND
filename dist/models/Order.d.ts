import { Model } from 'sequelize-typescript';
interface IOrderItems {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
    description: string;
}
interface IOrder {
    name: string;
    cel: string;
    total: number;
    status: string;
    wayToPay: string;
    date: Date;
    order: IOrderItems[];
}
declare class Order extends Model<IOrder, IOrder> {
    name: string;
    cel: string;
    total: number;
    status: string;
    wayToPay: string;
    date: Date;
    order: IOrderItems[];
}
export default Order;
