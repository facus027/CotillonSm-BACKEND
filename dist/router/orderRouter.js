"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const OrderController_1 = require("../controllers/OrderController");
const router = (0, express_1.default)();
router.post('/', (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"), (0, express_validator_1.body)('cel')
    .notEmpty()
    .withMessage("El Celular del Cliente es Obligatorio"), (0, express_validator_1.body)('total')
    .notEmpty()
    .withMessage("Hay un error en la Order"), (0, express_validator_1.body)('order')
    .notEmpty()
    .withMessage('Hay un error en la orden'), validation_1.handlerInputErrors, OrderController_1.OrderController.createOrder);
router.put('/status/:orderId', (0, express_validator_1.param)('orderId')
    .notEmpty()
    .withMessage('El Id de la order es obligatoria'), (0, express_validator_1.body)('status')
    .notEmpty()
    .withMessage('El nuevo estado es obligatorio'), validation_1.handlerInputErrors, OrderController_1.OrderController.OrderUpdateStatus);
router.get('/cel/:cel', (0, express_validator_1.param)('cel')
    .notEmpty().isMobilePhone('any')
    .withMessage('El numero de telefono es obligatorio'), validation_1.handlerInputErrors, OrderController_1.OrderController.getOrderByCel);
router.get('/status/:status', (0, express_validator_1.param)('status')
    .notEmpty()
    .withMessage('El estado de la orden es obligatorio'), validation_1.handlerInputErrors, OrderController_1.OrderController.getOrderByStatus);
router.get('/wayToPay/:wayToPay', (0, express_validator_1.param)('wayToPay')
    .notEmpty()
    .withMessage('La forma de pago de la orden es obligatoria'), validation_1.handlerInputErrors, OrderController_1.OrderController.getOrderByWayToPay);
router.get('/', OrderController_1.OrderController.getOrderAll);
router.delete('/:orderId', (0, express_validator_1.param)('orderId')
    .notEmpty()
    .withMessage('El Id de la order es obligatoria'), validation_1.handlerInputErrors, OrderController_1.OrderController.deleteOrderById);
exports.default = router;
//# sourceMappingURL=orderRouter.js.map