import type { Request, Response } from "express";
import Order from "../models/Order";
import { param } from "express-validator";

export class OrderController {

    static createOrder = async (req: Request, res: Response) => {
        try {
            const cel = req.body.cel
            const order = new Order(req.body);
            await order.save();
            res.send(cel)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static OrderUpdateStatus = async (req: Request, res: Response) => {

        try {

            const { orderId } = req.params;
            const status = req.body.status;

            const order = await Order.findByPk(orderId)

            if (!order) {
                return res.status(404).json({ error: 'Orden No Encontrada' })
            }

            await order.update({ status })

            res.send(status);

        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static getOrderByCel = async (req: Request, res: Response) => {
        const { cel } = req.params

        try {
            const order = await Order.findOne({
                where: {
                    'cel': cel
                }
            })
            if (!order) {
                return res.status(404).json({
                    error: 'Orden No Encontrada'
                })
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static getOrderAll = async (req: Request, res: Response) => {

        try {
            const orders = await Order.findAll({})
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static getOrderByStatus = async (req: Request, res: Response) => {

        try {
            const { status } = req.params
            const orders = await Order.findAll({
                where: {
                    'status': status
                }
            })
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static getOrderByWayToPay = async (req: Request, res: Response) => {

        try {
            const { wayToPay } = req.params

            const orders = await Order.findAll({
                where: {
                    'wayToPay': wayToPay
                }
            })
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

    static deleteOrderById = async (req: Request, res: Response) => {

        try {
            const { orderId } = req.params
            const order = await Order.findByPk(orderId)
            if (!order) {
                return res.status(404).json({
                    error: 'Orden No Encontrada'
                })
            }
            await order.destroy()
            res.send('Orden Eliminada')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    }

}