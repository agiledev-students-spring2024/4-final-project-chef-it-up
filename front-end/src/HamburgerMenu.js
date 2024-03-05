import React from "react";
import './HamburgerMenu.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
    return (
        <div  className="hamburger-menu">
            <Menu>
            <h3>Chef It Up</h3>
            <Link to="/fridge">My Fridge</Link>
            <Link to="/browseRecipes">Browse Recipes</Link>
            <Link to="/myRecipes">My Recipes</Link>
            <Link to="/favoriteRecipes">favorite Recipes</Link>
            <Link to="/addRecipe">Add a Recipe</Link>
            <Link to="/generateRecipe">Generate a Recipe</Link>
            <Link to="/myProfile">My Profile</Link>
            <Link to="/aboutUs">About Us</Link>
            
            </Menu>  
        </div>
        

    );
}

export default HamburgerMenu


