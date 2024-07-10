import Router from "express";
import { body, param } from "express-validator";
import { handlerInputErrors } from "../middleware/validation";
import { ProductController } from "../controllers/ProductController";
import upload from '../config/multerConfig'

const router = Router()

router.get('/', ProductController.getAllProduct)

router.post('/',
    body("name")
    .notEmpty()
        .withMessage("El Nombre del Producto es Obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripcion del Producto es Obligatorio"),
    body("price")
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body("image")
        .notEmpty()
        .withMessage("La imagen del Producto es Obligatorio"),
    body("category")
        .notEmpty()
        .withMessage("La categoria del Producto es Obligatorio"),
    handlerInputErrors,
    ProductController.createProduct
)

router.get('/:productId',
    param('productId').isInt().withMessage('ID no válido'),
    handlerInputErrors,
    ProductController.getProductById)

router.put('/:productId',
    param('productId').isInt().withMessage('ID no válido'),
    body("name")
    .notEmpty()
        .withMessage("El Nombre del Producto es Obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripcion del Producto es Obligatorio"),
    body("price")
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body("image")
        .notEmpty()
        .withMessage("La imagen del Producto es Obligatorio"),
    body("category")
        .notEmpty()
        .withMessage("La categoria del Producto es Obligatorio"),
    handlerInputErrors,
    ProductController.updateProduct
)

router.patch('/:productId',
    param('productId').isInt().withMessage('ID no válido'),
    ProductController.updateProductAvailability
)

router.delete('/:productId',
    param('productId').isInt().withMessage('ID no válido'),
    ProductController.deleteProductById
)

router.get('/categoria/:category',
    param("category")
        .notEmpty()
        .withMessage("La categoria es Obligatorio"),
    handlerInputErrors,
    ProductController.getAllCastegory
)

router.post('/categoria/:category',
    param("category")
        .notEmpty()
        .withMessage("La categoria es Obligatorio"),
    body("percent")
        .notEmpty()
        .withMessage("El porsentaje es Obligatorio"),
    handlerInputErrors,
    ProductController.updateCategoryPrice
)

router.post('/upload', upload.single('file'),ProductController.uploadImage)

export default router;