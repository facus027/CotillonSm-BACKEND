import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'

dotenv.config()

const db =new Sequelize(process.env.URL_DB!,{
    models: [ __dirname + '/../models/**/*']
})

export default db