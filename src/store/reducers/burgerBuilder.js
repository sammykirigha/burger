/** @format */

import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../Utility'

const initialState = {
	ingredients: null,
  totalPrice: 400,
  error: false,
  building: false
};


const INGREDEINT_PRICES = {
	salad: 50,
	cheese: 50,
	meat: 130,
	bacon: 70,
};

const addIngredients = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDEINT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState);
}

const removeIngredients = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1  }
  const updatedIngs = updateObject(state.ingredients, updatedIng)
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDEINT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedSt);

}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 400,
    error: true,
    building: false
  });
}

const fetchIngredientsFail = (state, action) => {
  return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INDREDIENT: return addIngredients(state, action)
    case actionTypes.REMOVE_INDREDIENT: return removeIngredients(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state, action)
    default:
      return state    
	}
};

export default reducer
