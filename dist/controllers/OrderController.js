"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = __importDefault(require("../models/Order"));
class OrderController {
    static createOrder = async (req, res) => {
        try {
            const cel = req.body.cel;
            const order = new Order_1.default(req.body);
            await order.save();
            res.send(cel);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static OrderUpdateStatus = async (req, res) => {
        try {
            const { orderId } = req.params;
            const status = req.body.status;
            const order = await Order_1.default.findByPk(orderId);
            if (!order) {
                return res.status(404).json({
                    error: 'Orden No Encontrada'
                });
            }
            //Actualizar
            const newOrder = new Order_1.default();
            newOrder.name = order.dataValues.name;
            newOrder.cel = order.dataValues.cel;
            newOrder.wayToPay = order.dataValues.wayToPay;
            newOrder.total = order.dataValues.total;
            newOrder.order = order.dataValues.order;
            newOrder.date = order.dataValues.date;
            newOrder.status = status;
            await order.update(newOrder);
            await order.save();
            res.send(`El estado fue modificado a '${status}'`);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getOrderByCel = async (req, res) => {
        const { cel } = req.params;
        try {
            const order = await Order_1.default.findOne({
                where: {
                    'cel': cel
                }
            });
            if (!order) {
                return res.status(404).json({
                    error: 'Orden No Encontrada'
                });
            }
            res.json(order);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getOrderAll = async (req, res) => {
        try {
            const orders = await Order_1.default.findAll({});
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getOrderByStatus = async (req, res) => {
        try {
            const { status } = req.params;
            const orders = await Order_1.default.findAll({
                where: {
                    'status': status
                }
            });
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getOrderByWayToPay = async (req, res) => {
        try {
            const { wayToPay } = req.params;
            const orders = await Order_1.default.findAll({
                where: {
                    'wayToPay': wayToPay
                }
            });
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static deleteOrderById = async (req, res) => {
        try {
            const { orderId } = req.params;
            const order = await Order_1.default.findByPk(orderId);
            if (!order) {
                return res.status(404).json({
                    error: 'Orden No Encontrada'
                });
            }
            await order.destroy();
            res.send('Orden Eliminada');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map