import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import './Header.css'

const Header = () =>{


    return (
        <div className="header-div">
            <HamburgerMenu />
            <div className="name-and-logout-div">
                <h1 className="main-title">Chef it up</h1>
            </div>

        </div>
    )
    
}

export default Header;