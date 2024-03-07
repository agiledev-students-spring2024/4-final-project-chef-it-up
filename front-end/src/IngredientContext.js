import React, { createContext, useState, useContext } from 'react';

const IngredientContext = createContext();

export const useIngredientContext = () => useContext(IngredientContext);

export const IngredientProvider = ({ children }) => {
  const [getIngredient, setSelectedIngredient] = useState(null);

  const getCurrIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  return (
    <IngredientContext.Provider value={{ getIngredient, getCurrIngredient}}>
      {children}
    </IngredientContext.Provider>
  );
};
