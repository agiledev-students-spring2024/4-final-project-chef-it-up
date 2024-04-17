import React, { useState, useEffect  } from "react"
import { Link} from 'react-router-dom'
import axios  from 'axios'
import './Profile.css'

const Profile = () =>{

  const userId = localStorage.getItem('userId')
  const jwtToken = localStorage.getItem("jwt");
  const [userData, setUserData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    console.log("useEffect is being called ")
    axios.get(`http://localhost:3001/api/myProfile/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Send the JWT token in the authorization header
      },
    })
      .then(response => {
        setUserData(response.data)
        setIsLoggedIn(true);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching user")
      })
    }, [userId, jwtToken])


    if (!isLoggedIn) {
      return <p>You are not authorized to use this feature. Please <Link to="/">log in</Link> first</p>;
    }
    

  
    return (
      <form className="profile-form">
        <h1>Profile</h1>
        <div class="formField">
          <h2>Username:</h2>
          <p>{ userData.username }</p>
        </div>
        <div>
          <Link to="/editMyProfile/:userId"> <button className="submit-recipe-button">Edit your Profile</button></Link>
      </div>
    </form>
    )
};

export default Profile;