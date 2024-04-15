import React, { useState, useEffect  } from "react"
import { Link, useParams } from 'react-router-dom'
import axios  from 'axios'
import './Profile.css'

const Profile = () =>{

  const userId = localStorage.getItem('userId')
  const [userData, setUserData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("useEffect is being called ")
    axios.get(`http://localhost:3001/api/myProfile/${userId}`)
      .then(response => {
        setUserData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching user")
      })
    }, [userId])

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

  if (error)
    return (
      <form className="profile-form">
        <p>Profile</p>
          <div class="formField">
            <h1>Username:</h1>
            <h2>Guest</h2>
            
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
        <div>
          <Link to="/editMyProfile/:userId">Edit your Profile</Link>
      </div>
    </form>
    )
};

export default Profile;