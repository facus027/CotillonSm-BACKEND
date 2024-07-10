import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'


const categories = ['Reposteria','Decoracion','Carnaval','Globos','Golosinas','Souvenirs','Decoracion Torta','Combos','Fiestas Patrias','Disfrases']

@Table({
    tableName:'products'
})

class Product extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.STRING(100)
    })
    description: string

    @Column({
        type: DataType.INTEGER
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean

    @Column({
        type: DataType.STRING(100)
    })
    image: string

    @Column({
        type: DataType.ENUM('reposteria','decoracion','carnaval','globos','golosinas','souvenirs','decoracion Torta','combos','fiestas Patrias','disfrases'),
    })
    category: string
}

export default Product

