"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const colors_1 = __importDefault(require("colors"));
const body_parser_1 = __importDefault(require("body-parser"));
//conection DB
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        console.log(colors_1.default.blue.bold('Conexion exitosa a la base de datos'));
    }
    catch (error) {
        console.log(error);
        console.log(colors_1.default.red.bold('Hubo un error al conectar la BD'));
    }
}
connectDB();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsConfig));
// Leer datos de formularios
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//Routing
app.use('/api/products', productRouter_1.default);
app.use('/api/order', orderRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map