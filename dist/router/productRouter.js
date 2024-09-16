"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const ProductController_1 = require("../controllers/ProductController");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const router = (0, express_1.default)();
router.get('/', ProductController_1.ProductController.getAllProduct);
router.get('/pagina', ProductController_1.ProductController.getPaginatedProducts);
router.post('/', (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El Nombre del Producto es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty()
    .withMessage("La descripcion del Producto es Obligatorio"), (0, express_validator_1.body)("price")
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de Producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no válido'), (0, express_validator_1.body)("image")
    .notEmpty()
    .withMessage("La imagen del Producto es Obligatorio"), (0, express_validator_1.body)("category")
    .notEmpty()
    .withMessage("La categoria del Producto es Obligatorio"), validation_1.handlerInputErrors, ProductController_1.ProductController.createProduct);
router.get('/:productId', (0, express_validator_1.param)('productId').isInt().withMessage('ID no válido'), validation_1.handlerInputErrors, ProductController_1.ProductController.getProductById);
router.put('/:productId', (0, express_validator_1.param)('productId').isInt().withMessage('ID no válido'), (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El Nombre del Producto es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty()
    .withMessage("La descripcion del Producto es Obligatorio"), (0, express_validator_1.body)("price")
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de Producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no válido'), (0, express_validator_1.body)("category")
    .notEmpty()
    .withMessage("La categoria del Producto es Obligatorio"), validation_1.handlerInputErrors, ProductController_1.ProductController.updateProduct);
router.patch('/:productId', (0, express_validator_1.param)('productId').isInt().withMessage('ID no válido'), ProductController_1.ProductController.updateProductAvailability);
router.delete('/:productId', (0, express_validator_1.param)('productId').isInt().withMessage('ID no válido'), ProductController_1.ProductController.deleteProductById);
router.get('/categoria/:category', (0, express_validator_1.param)("category")
    .notEmpty()
    .withMessage("La categoria es Obligatorio"), validation_1.handlerInputErrors, ProductController_1.ProductController.getAllCastegory);
router.post('/categoria/:category', (0, express_validator_1.param)("category")
    .notEmpty()
    .withMessage("La categoria es Obligatorio"), (0, express_validator_1.body)("percent")
    .notEmpty()
    .withMessage("El porsentaje es Obligatorio"), validation_1.handlerInputErrors, ProductController_1.ProductController.updateCategoryPrice);
router.post('/upload', multerConfig_1.default.single('file'), ProductController_1.ProductController.uploadImage);
exports.default = router;
//# sourceMappingURL=productRouter.js.map