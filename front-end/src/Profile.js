import React, { useState, useEffect  } from "react";
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = ({ user }) =>{
  const [userData, setUserData] = useState([])
  const [error, setError] = useState("")

  const fetchUserData = () => {
    fetch("Backend")
      .then((response) => {
        response.json()
      })
      .then((data) => setUserData(data.results))
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "This ain't working just yet, give us some time :)"
        )
      })
  }

  useEffect(() => {
      if (user) {
        setUserData(user)
      }
    }, [])
  
  
  if (error)
    return (
      <form className="profile-form">
        <p>Profile</p>
          <div class="formField">
            <h1>Username:</h1>
            <h2>Guest</h2>
            
          </div>
          <div class="formField">
            <h1>Password:</h1>
            <h2>Hello</h2>
          </div>
          <div>
            <Link to="/editMyProfile"><button className="submit-recipe-button" type="submit" > Edit Your Profile</button>
            </Link>
        </div>
      </form>
    )
  else
    return (
      <form className="profile-form">
        <h1>Profile</h1>
        <div class="formField">
          <h2>Username:</h2>
          <p>{ userData.username }</p>
        </div>
        <div class="formField">
          <h2>Password:</h2>
          <p>{ userData.password }</p>
        </div>
        <div>
          <Link to="/editMyProfile">Edit your Profile</Link>
      </div>
    </form>
    )
};

export default Profile;