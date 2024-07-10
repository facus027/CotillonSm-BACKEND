import type { Request, Response } from "express";
import Product from "../models/Product";

export class ProductController {

    static createProduct = async (req:Request,res:Response) => {
        const product = new Product(req.body);
        try {
            await product.save();
            res.send('Producto Creado')
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static getAllProduct = async (req:Request,res:Response) => {
      
        try {
            const products = await Product.findAll({
                order: [
                    ['category', 'DESC']
                ]
            })
            res.json(products);
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static getProductById = async (req:Request,res:Response) => {
      
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)
            if(!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                })
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static updateProduct = async (req:Request,res:Response) => {
      
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)
            if(!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                })
            }

             // Actualizar
            await product.update(req.body)
            await product.save()

            res.send('Producto Actualizado')
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static updateProductAvailability = async (req:Request,res:Response) => {
      
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)
            if(!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                })
            }

            // Actualizar
            const newproduct=new Product()
            newproduct.name = product.dataValues.name
            newproduct.description = product.dataValues.description
            newproduct.price = product.dataValues.price
            newproduct.image = product.dataValues.image
            newproduct.category = product.dataValues.category
            newproduct.availability = !product.dataValues.availability
            await product.update(newproduct)
            await product.save()
            
            res.send('Producto Actualizado')
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static deleteProductById = async (req:Request,res:Response) => {
      
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)
            if(!product) {
                return res.status(404).json({
                    error: 'Producto No Encontrado'
                })
            }
            await product.destroy()
            res.json({data: 'Producto Eliminado'})
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static getAllCastegory = async (req:Request,res:Response) => {
      
        const {category} = req.params
        const percent = req.body.percent
        
        try {
            const products = await Product.findAll({
                where: {
                    'category':category
                }
            })
           
            res.json(products);
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static updateCategoryPrice = async (req:Request,res:Response) => {
      
        const {category} = req.params
        const percent = req.body.percent
        
        try {
            const products = await Product.findAll({
                where: {
                    'category':category
                }
            })
           
             products.map(product => {
                
                 const newproduct=new Product()
                newproduct.name = product.dataValues.name
                newproduct.description = product.dataValues.description
                newproduct.price = Math.ceil(product.dataValues.price + ((product.dataValues.price * percent)/100))
                newproduct.image = product.dataValues.image
                newproduct.category = product.dataValues.category
                newproduct.availability = product.dataValues.availability
                 
                 product.update(newproduct)
                 product.save()
            })
                        
            res.send('Precios Actualizados')
        } catch (error) {
            res.status(500).json({ error : 'Hubo un Error'});
        }
    }

    static uploadImage = async (req: Request, res: Response) => { 

        try {
            // @ts-ignore
            const imageUrl = req.file.path; // La URL de la imagen subida
            res.status(200).json({
              imageUrl: imageUrl,
            }
        );
          } catch (error) {
            res.status(500).json({
              message: 'Error al subir la imagen'
            }
        );
        }
        
    }


}
