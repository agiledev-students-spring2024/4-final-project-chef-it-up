import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './EditProfile.css';

const EditProfile = ({ user, setUser }) =>{
  const [userData, setUserData] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [userid,setId] = useState("")
  const navigate = useNavigate()

  useEffect(() =>{
    if (user === null){
      navigate("/myProfile")
    } else {
      setId(user.id)
      setUsername(user.username)
      setPassword(user.password)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    fetch('http://localhost:3001/api/editMyProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, userid }),
    })
      .then(response => {
        if (response.ok){
          return response.json()
        }
        else if (response.status === 401){
          throw new Error('Invalid Username or Password')
        }
        console.log(`Received server response: ${response.data}`)
      })
      .then(data => {
        //setUser(data)
        navigate('/myProfile')
      })
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "Failed to edit profile, invalid username or password"
        )
      })

  // axios
  //   .post("Backend",{
  //     userid: user.id,
  //     username:username,
  //     password:password,
  //   })
  //   .then(response => {
  //     console.log(`Received server response: ${response.data}`)
  //   })
  //   .catch(err => {
  //     console.log(`Received server error: ${err}`)
  //     setError(
  //       "This ain't working just yet, give us some time :)"
  //     )
  //   })
    }
  
  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Edit Your Profile</h1>
        <div class="formField">
          <label className="edit-profile-label" htmlFor="username_field">Enter your Username:</label>
          <br />
          <input
            id="username_field"
            type="text"
            placeholder={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="edit-profile-label" htmlFor="password_field">Enter your Password:</label>
          <br />
          <input
            id="password_field"
            type="text"
            placeholder={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        <div>
          <button className="submit-edit-button" type="submit"> Edit Profile</button>
        </div>
        <div>
          <Link to="/myProfile">
          <button className="cancel-edit-button" type="submit"> Cancel your Profile Changes </button>
            
          </Link>
        </div>

        </div>
        
      </main>
    </form>
  )
};


export default EditProfile;