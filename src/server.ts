import express from "express";
import productRouter from "./router/productRouter";
import orderRouter from "./router/orderRouter";
import recipeRoute from "./router/recipeRouter";
import db from "./config/db";
import cors from 'cors'
import { corsConfig } from './config/cors'
import colors from 'colors'
import bodyParser from 'body-parser';


//conection DB
async function connectDB() {
    try {
        await db.authenticate()
         db.sync()
        console.log(colors.blue.bold('Conexion exitosa a la base de datos'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar la BD'))
    }
}
connectDB()

const app = express()

app.use(cors(corsConfig))

// Leer datos de formularios
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.use('/api/products',productRouter)
app.use('/api/order', orderRouter)
app.use('/api/recipes',recipeRoute)

export default app