import type { Request, Response } from "express";
import Recipe from '../models/Recipe';
import { where } from "sequelize";

export class RecipeController {
  
  
  static createRecipe = async (req: Request, res: Response) => {
    const recipe = new Recipe(req.body);
    try {
      await recipe.save();
      res.send('Receta creada');
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la receta' });
    }
  };

  
  static getAllRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await Recipe.findAll({
        order: [['title', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener recetas' });
    }
  };

  
  static getRecipeById = async (req: Request, res: Response) => {
    try {
      const { recipeId } = req.params;
      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la receta' });
    }
  };

  
  static updateRecipe = async (req: Request, res: Response) => {
    try {
      const { recipeId } = req.params;
      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }

      await recipe.update(req.body);
      res.send('Receta actualizada');
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la receta' });
    }
  };

  
  static deleteRecipe = async (req: Request, res: Response) => {
    try {
      const { recipeId } = req.params;
      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }

      await recipe.destroy();
      res.send('Receta eliminada');
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la receta' });
    }
    };
    
    static searchRecipe = async (req: Request, res: Response) => { 

        try {
            const  search  = req.params.search;
            const recipe = await Recipe.findAll({
                where: {
                    $title$: search,
                    $tag$:search
                }
            })
            if (!recipe) {
                return res.status(404).json({ error: 'Receta no encontrada' });
              }
          
            res.json(recipe)
            
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar recetas' });
        }

    }
}
