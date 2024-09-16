import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'



interface IOrderItems {
        id: number,
        name: string,
        image: string,
        price: number,
        quantity: number,
        subtotal:number,
        description:string
}

interface IOrder {
    name:string,
    cel: string,
    total: number,
    status: string,
    wayToPay:string,
    date:Date,
    order: IOrderItems[]
}

@Table({
    timestamps:false,
    tableName:'orders'
})

class Order extends Model<IOrder,IOrder> {

    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.STRING(100)
    })
    cel: string

    @Column({
        type: DataType.INTEGER
    })
    total: number

    @Column({
        type: DataType.ENUM('pendiente', 'pagado', 'para retirar', 'entregado'),
        defaultValue:'pendiente'
    })
    status: string

    @Column({
        type: DataType.STRING,  
    })
    wayToPay: string

    @Column({
        type: DataType.DATE(),
        defaultValue: DataType.NOW,
    })
    date: Date

    @Column({
        type: DataType.JSONB,
        allowNull: false
    })
    order: IOrderItems[]


}

export default Order