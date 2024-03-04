import React, { useState, useEffect  } from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import Select from 'react-select'
import './Profile.css'

const EditProfile = () =>{
  const [userData, setUserData] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    
    axios
      .post("Backend",{
        username:username,
        password:password,
      })
      .then(response => {
        console.log(`Received server response: ${response.data}`)
      })
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "This ain't working just yet, give us some time :)"
        )
      })
    }
  
  return (
    <form onSubmit={handleSubmit}>
      <main className="App">
        <h1>Edit Your Profile</h1>
        <div class="formField">
          <label htmlFor="username_field">Enter your Username:</label>
          <br />
          <input
            id="username_field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="password_field">Enter your Password:</label>
          <br />
          <input
            id="password_field"
            type="text"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to="/">
            <input type="submit" value="Edit Profile"/>
          </Link>
        </div>
        <div>
          <p><Link to="/myProfile">Cancel your Profile Changes</Link></p>
        </div>
      </main>
    </form>
  )
};


export default EditProfile;