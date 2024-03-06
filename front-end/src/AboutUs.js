import React from 'react'
import "./AboutUs.css"

const AboutUs = () =>{
    return (
        <div className="about-us-container">
            <div className="about-us-content">
                <h1>About Us</h1>
                <p className='about-us-p'>
                    Welcome to Chef It Up! We are passionate about making cooking an enjoyable and delicious experience for everyone.
                </p>
                <p className='about-us-p'>
                    Chef it Up is an app that will not only help you reduce your food waste, but also give you plenty more options.
                </p>
                <p className='about-us-p'>
                    Whether you're a student looking for simple recipes, a stay-at-home mom trying to keep track of what ingredients you have, or anyone else, we have something for you!
                </p>
                <p className='about-us-p' >
                    Happy cooking!
                </p>
            </div>
        </div>
    )
};

export default AboutUs;