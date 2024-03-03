import React, { useState, useEffect  } from "react";
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () =>{
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
      fetchUserData()
    }, [])
  
  
  if (error)
    return (
      <form>
        <h1>Profile</h1>
          <div class="formField">
            <h2>Username:</h2>
            <p>Guest</p>
          </div>
          <div class="formField">
            <h2>Password:</h2>
            <p>None</p>
          </div>
          <div>
            <Link to="/editMyProfile">Edit your Profile</Link>
        </div>
      </form>
    )
  else
    return (
      <form>
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