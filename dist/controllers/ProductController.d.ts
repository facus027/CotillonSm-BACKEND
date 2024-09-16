import type { Request, Response } from "express";
export declare class ProductController {
    static createProduct: (req: Request, res: Response) => Promise<void>;
    static getAllProduct: (req: Request, res: Response) => Promise<void>;
    static getPaginatedProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updateProductAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getAllCastegory: (req: Request, res: Response) => Promise<void>;
    static updateCategoryPrice: (req: Request, res: Response) => Promise<void>;
    static uploadImage: (req: Request, res: Response) => Promise<void>;
}
