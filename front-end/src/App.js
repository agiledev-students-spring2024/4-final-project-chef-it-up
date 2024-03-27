import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MyFridge from './MyFridge'
import AddRecipe from './AddRecipe'
import BrowseRecipes from './BrowseRecipes'
import FavoriteRecipes from './FavoriteRecipes'
import MyRecipes from './MyRecipes'
import GenerateRecipe from "./GenerateRecipe"
import Profile from './Profile'
import EditProfile from './EditProfile'
import AddIngredient from "./AddIngredient"
import Header from './Header'
import Login from './Login'
import Register from './Register'
import IndividualRecipeDetail from './IndividualRecipeDetail';
import IndividualFavoriteDetail from './IndividualFavoriteDetail';
import IngredientDetails from "./IngredientDetails"
import MyRecipesDetail from "./MyRecipesDetail"
import EditRecipe from "./EditRecipe"
import EditIngredient from "./EditIngredient"
import { RecipeProvider } from './RecipeContext';
import { IngredientProvider } from "./IngredientContext"
import AboutUs from "./AboutUs"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <IngredientProvider>
          {/* comment out recipe provider as my route currently does not use it as i am thinking of refactoring*/ }
        {/*<RecipeProvider>*/}
         <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  path="/browseRecipes" element={<BrowseRecipes />} />
          <Route path="/individualRecipe/:recipeId" element={<IndividualRecipeDetail />} /> 
          <Route path="/favoriteRecipes/:recipeId" element={<IndividualFavoriteDetail />} /> 
          <Route  path="/fridge" element={<MyFridge />} />
          <Route  path="/myRecipes" element={<MyRecipes />} />
          <Route path="/myRecipes/:recipeId" element={<MyRecipesDetail />} /> 
          <Route  path="/favoriteRecipes" element={<FavoriteRecipes/>} />
          <Route  path="/addRecipe" element={<AddRecipe />} />
          <Route  path="/generateRecipe" element={<GenerateRecipe />} />
          <Route  path="/editRecipe/:recipeId" element={<EditRecipe />} />
          <Route  path="/myProfile" element={<Profile />} />
          <Route  path="/editMyProfile" element={<EditProfile />} />
          <Route path="/aboutUs" element={<AboutUs />} /> 
          <Route path="/addIngredient" element={<AddIngredient />} />
          <Route path="/IngredientDetails/:ingredientId" element={<IngredientDetails />} />
          <Route path="/editIngredient" element={<EditIngredient />} />

         </Routes>
        {/*</RecipeProvider>*/}
        </IngredientProvider>
      </Router>

    </div>
  );
}

export default App;
