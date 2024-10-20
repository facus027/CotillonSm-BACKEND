import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

interface IProduct {
    name: string,
    description: string,
    price: number,
    availability: boolean,
    image: string,
    category: string,

}

@Table({
    tableName: 'products'
})

class Product extends Model<IProduct, IProduct> {

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
        type: DataType.ENUM('reposteria', 'decoracion', 'carnaval', 'globos', 'golosinas', 'souvenirs', 'decoracion Torta', 'combos', 'fiestas Patrias', 'disfraces'),
    })
    category: string


}

export default Product

