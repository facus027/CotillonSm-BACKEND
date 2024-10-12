import Router from 'express'
import { body, param } from 'express-validator'
import { handlerInputErrors } from '../middleware/validation'
import { RecipeController } from '../controllers/RecipeController'

const router = Router()

router.post(
    '/',
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('ingredients').isArray().withMessage('Los ingredientes deben ser un array'),
    body('preparation').isArray().withMessage('Las instrucciones deben ser un array'),
    body('imgUrl').notEmpty().withMessage('La imagen es obligatoria'),
    body('tag').notEmpty().withMessage('La etiqueta es obligatoria'),
    handlerInputErrors,
    RecipeController.createRecipe
  );
  
  // Ruta para obtener todas las recetas
  router.get('/', RecipeController.getAllRecipes);
  
  // Ruta para obtener una receta por ID
  router.get(
    '/:recipeId',
    param('recipeId').notEmpty().withMessage('El ID de la receta es obligatorio'),
    handlerInputErrors,
    RecipeController.getRecipeById
);

//no Funciona
router.get(
    '/search/:search',
    param("search").notEmpty().withMessage("Ingresa palabra clave"),
    handlerInputErrors,
    RecipeController.searchRecipe
  );
  
  // Ruta para actualizar una receta
  router.put(
    '/:recipeId',
    param('recipeId').notEmpty().withMessage('El ID de la receta es obligatorio'),
    body('title').optional(),
    body('ingredients').optional().isArray(),
    body('preparation').optional().isArray(),
    body('imgUrl').optional(),
    body('tag').optional(),
    handlerInputErrors,
    RecipeController.updateRecipe
  );
  
  // Ruta para eliminar una receta
  router.delete(
    '/:recipeId',
    param('recipeId').notEmpty().withMessage('El ID de la receta es obligatorio'),
    handlerInputErrors,
    RecipeController.deleteRecipe
  );


export default router