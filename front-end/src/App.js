import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MyFridge from './MyFridge'
import AddRecipe from './AddRecipe'
import BrowseRecipes from './BrowseRecipes'
import FavoriteRecipes from './FavoriteRecipes'
import MyRecipes from './MyRecipes'
import GenerateRecipe from "./GenerateRecipe"
import Profile from './Profile'
import EditProfile from './EditProfile'
import Header from './Header'
import Login from './Login'
import Register from './Register'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route  path="/browseRecipes" element={<BrowseRecipes />} />
          <Route  path="/fridge" element={<MyFridge />} />
          <Route  path="/myRecipes" element={<MyRecipes />} />
          <Route  path="/favoriteRecipes" element={<FavoriteRecipes/>} />
          <Route  path="/addRecipe" element={<AddRecipe />} />
          <Route  path="/generateRecipe" element={<GenerateRecipe />} />
          <Route  path="/myProfile" element={<Profile />} />
          <Route  path="/editMyProfile" element={<EditProfile />} />
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
