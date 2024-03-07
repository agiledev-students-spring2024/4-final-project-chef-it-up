// RecipeContext.js
import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [getRecipe, setSelectedRecipe] = useState(null);

  const getCurrRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <RecipeContext.Provider value={{ getRecipe, getCurrRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
