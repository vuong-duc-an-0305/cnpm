import { apiService } from './api'
import type { Recipe, RecipeForm } from '@/types'

export const recipeService = {
  // Get all recipes
  getAll: (productId?: number, ingredientId?: number): Promise<Recipe[]> => {
    const params: any = {}
    if (productId) params.product_id = productId
    if (ingredientId) params.ingredient_id = ingredientId
    return apiService.get('/recipes/', params)
  },

  // Get recipes by product
  getByProduct: (productId: number): Promise<Recipe[]> => {
    return apiService.get('/recipes/by-product/', { product_id: productId })
  },

  // Create new recipe
  create: (data: RecipeForm): Promise<Recipe> => {
    return apiService.post('/recipes/', data)
  },

  // Create multiple recipes (bulk create)
  bulkCreate: (productId: number, ingredients: Omit<RecipeForm, 'ProductID'>[]): Promise<Recipe[]> => {
    return apiService.post('/recipes/bulk-create/', {
      ProductID: productId,
      ingredients
    })
  },

  // Delete recipes by product
  deleteByProduct: (productId: number): Promise<void> => {
    return apiService.delete('/recipes/delete-by-product/', { params: { product_id: productId } })
  },

  // Update recipe
  update: (productId: number, ingredientId: number, data: Partial<RecipeForm>): Promise<Recipe> => {
    return apiService.put(`/recipes/${productId}/${ingredientId}/`, data)
  },

  // Delete specific recipe
  delete: (productId: number, ingredientId: number): Promise<void> => {
    return apiService.delete(`/recipes/${productId}/${ingredientId}/`)
  },
}
