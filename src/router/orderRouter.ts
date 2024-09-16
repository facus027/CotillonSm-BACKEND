import Router from 'express'
import { body, param } from 'express-validator'
import { handlerInputErrors } from '../middleware/validation'
import { OrderController } from '../controllers/OrderController'

const router = Router()

router.post('/',
    body("name")
        .notEmpty()
        .withMessage("El Nombre del Cliente es Obligatorio"),
    body('cel')
        .notEmpty()
        .withMessage("El Celular del Cliente es Obligatorio"),
    body('total')
        .notEmpty()
        .withMessage("Hay un error en la Order"),
    body('order')
        .notEmpty()
        .withMessage('Hay un error en la orden'),
    handlerInputErrors,
    OrderController.createOrder
)

router.put('/status/:orderId',
    param('orderId')
        .notEmpty()
        .withMessage('El Id de la order es obligatoria'),
    body('status')
        .notEmpty()
        .withMessage('El nuevo estado es obligatorio'),
    handlerInputErrors,
    OrderController.OrderUpdateStatus
)

router.get('/cel/:cel',
    param('cel')
        .notEmpty().isMobilePhone('any')
        .withMessage('El numero de telefono es obligatorio'),
    handlerInputErrors,
    OrderController.getOrderByCel
)

router.get('/status/:status',
    param('status')
        .notEmpty()
        .withMessage('El estado de la orden es obligatorio'),
    handlerInputErrors,
    OrderController.getOrderByStatus
)

router.get('/wayToPay/:wayToPay',
    param('wayToPay')
        .notEmpty()
        .withMessage('La forma de pago de la orden es obligatoria'),
    handlerInputErrors,
    OrderController.getOrderByWayToPay
)

router.get('/', OrderController.getOrderAll)

router.delete('/:orderId',
    param('orderId')
        .notEmpty()
        .withMessage('El Id de la order es obligatoria'),
    handlerInputErrors,
    OrderController.deleteOrderById
)


export default router