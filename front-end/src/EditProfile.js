import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './EditProfile.css';

const EditProfile = () =>{
  const userId = localStorage.getItem('userId')
  const [oldUsername, setOldUsername] = useState("")
  const [username, setUsername] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [userid,setId] = useState("")
  const navigate = useNavigate()

  useEffect(() =>{
    console.log("useEffect is being called ")
    axios.get(`http://localhost:3001/api/myProfile/${userId}`)
      .then(response => {
        setOldUsername(response.data.username)
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching user")
      })
  }, [userId])

  const handleSubmit = async e => {
    e.preventDefault()
      try{
        const updateData = {
          oldUsername:oldUsername,
          username:username,
          oldPassword: oldPassword,
          newPassword: newPassword
        }

        const response = await axios.post(
          `http://localhost:3001/api/editMyProfile/${userId}`,
          updateData
        )

        navigate('/myProfile/:userId')

    } catch(err){

      setError(
        err.response.data.message
      )

    }
  }
  
  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Edit Your Profile</h1>
        <h3>If you would like to keep your username or password, please input them in their respective fields.</h3>
        <h4> {error} </h4>
        <div class="formField">
          <label className="edit-profile-label" htmlFor="username_field">Enter your Username:</label>
          <br />
          <input
            id="username_field"
            type="text"
            placeholder = "Username"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="edit-profile-label" htmlFor="password_field">Enter your former Password:</label>
          <br />
          <input
            id="password_field"
            type="text"
            placeholder="Password"
            onChange={e => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="edit-profile-label" htmlFor="password_field">Enter your new Password:</label>
          <br />
          <input
            id="password_field"
            type="text"
            placeholder="Password"
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <button className="submit-edit-button" type="submit"> Edit Profile</button>
          </div>
          <div>
            <Link to="/myProfile/:userId">
              <button className="cancel-edit-button" type="submit"> Cancel your Profile Changes </button>
            </Link>
          </div>
        </div>
        
      </main>
    </form>
  )
};


export default EditProfile;
