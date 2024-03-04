import './Login.css';
import React, { useEffect, useState } from "react"
import { Navigate, Link } from 'react-router-dom'
import axios from "axios"

const Login = props => {
  const [status, setStatus] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  useEffect(() => {
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`)
      props.setuser(status)
    }
  }, [status])

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post("Backend",{
        username:username,
        password:password,
      })
      .then(response => {
        console.log(`Received server response: ${response.data}`)
        setStatus(response.data)
      })
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "This ain't working just yet, give us some time :)"
        )
      })

      
  }
  if (!status.success)
    return (
      <form onSubmit={handleSubmit}>
        <main className="App">
          <h1>Chef-It-Up Login</h1>
          <div class="formField">
            <label htmlFor="username_field">Username:</label>
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
            <label htmlFor="password_field">Password:</label>
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
          {error && (
            <div>
              <p className="notwork">{error}</p>
              <Link to="/browseRecipes">Bypass Login due to Non-functionality</Link>
            </div>
          )}
          <div>
            <Link to="/browseRecipes">
              <input type="submit" value="Login"/>
            </Link>
          </div>
          <div>
            <p>Not a user? <Link to="/register">Register</Link></p>
          </div>
        </main>
      </form>
    );
  else return <Navigate to="/browseRecipes" />
}

export default Login;
