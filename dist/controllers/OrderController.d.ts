import type { Request, Response } from "express";
export declare class OrderController {
    static createOrder: (req: Request, res: Response) => Promise<void>;
    static OrderUpdateStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getOrderByCel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getOrderAll: (req: Request, res: Response) => Promise<void>;
    static getOrderByStatus: (req: Request, res: Response) => Promise<void>;
    static getOrderByWayToPay: (req: Request, res: Response) => Promise<void>;
    static deleteOrderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
