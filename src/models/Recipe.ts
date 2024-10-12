import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

interface IRecipe {
    title: string;
    ingredients: { quantity: string; ingredient: string }[];
    preparation: { instruction: string; time: number }[];
    imgUrl: string;
    tag: string;
}

@Table({
    tableName: 'recipes',
})
class Recipe extends Model<IRecipe, IRecipe> {

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.JSONB, // For storing array of objects
        allowNull: false,
    })
    ingredients: { quantity: string; ingredient: string }[];

    @Column({
        type: DataType.JSONB, // For storing array of objects
        allowNull: false,
    })
    preparation: { instruction: string; time: number }[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imgUrl: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    tag: string;
}

export default Recipe;