"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
class ProductController {
    static createProduct = async (req, res) => {
        const product = new Product_1.default(req.body);
        try {
            await product.save();
            res.send('Producto Creado');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getAllProduct = async (req, res) => {
        try {
            const products = await Product_1.default.findAll({
                order: [
                    ['category', 'DESC']
                ],
                attributes: { exclude: ['createdAt', "updatedAt"] },
            });
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getPaginatedProducts = async (req, res) => {
        const { page = 1, pageSize = 28 } = req.query;
        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;
        try {
            const { rows: products, count: totalItems } = await Product_1.default.findAndCountAll({
                limit,
                offset,
            });
            const totalPages = Math.ceil(totalItems / limit);
            return res.json({
                totalItems,
                totalPages,
                currentPage: parseInt(page),
                products,
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching products', error });
        }
    };
    static getProductById = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product_1.default.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                });
            }
            res.json(product);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static updateProduct = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product_1.default.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                });
            }
            // Actualizar
            const newproduct = new Product_1.default();
            newproduct.name = req.body.name;
            newproduct.description = req.body.description;
            newproduct.price = req.body.price;
            newproduct.image = product.dataValues.image;
            newproduct.category = req.body.category;
            newproduct.availability = req.body.availability;
            await product.update(newproduct);
            await product.save();
            res.send('Producto Actualizado');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static updateProductAvailability = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product_1.default.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                });
            }
            // Actualizar
            const newproduct = new Product_1.default();
            newproduct.name = product.dataValues.name;
            newproduct.description = product.dataValues.description;
            newproduct.price = product.dataValues.price;
            newproduct.image = product.dataValues.image;
            newproduct.category = product.dataValues.category;
            newproduct.availability = !product.dataValues.availability;
            await product.update(newproduct);
            await product.save();
            res.send('Producto Actualizado');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static deleteProductById = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product_1.default.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                });
            }
            await product.destroy();
            res.json({ data: 'Producto Eliminado' });
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static getAllCastegory = async (req, res) => {
        const { category } = req.params;
        try {
            const products = await Product_1.default.findAll({
                where: {
                    'category': category
                }
            });
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static updateCategoryPrice = async (req, res) => {
        const { category } = req.params;
        const percent = req.body.percent;
        try {
            const products = await Product_1.default.findAll({
                where: {
                    'category': category
                }
            });
            products.map(product => {
                const newproduct = new Product_1.default();
                newproduct.name = product.dataValues.name;
                newproduct.description = product.dataValues.description;
                newproduct.price = Math.ceil(product.dataValues.price + ((product.dataValues.price * percent) / 100));
                newproduct.image = product.dataValues.image;
                newproduct.category = product.dataValues.category;
                newproduct.availability = product.dataValues.availability;
                product.update(newproduct);
                product.save();
            });
            res.send('Precios Actualizados');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un Error' });
        }
    };
    static uploadImage = async (req, res) => {
        try {
            // @ts-ignore
            const imageUrl = req.file.path; // La URL de la imagen subida
            res.status(200).json({
                imageUrl: imageUrl,
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al subir la imagen'
            });
        }
    };
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map