import './Login.css'
import React, { useEffect, useState } from "react"
import { Navigate, Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = ({ setUser }) => {
  const [status, setStatus] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    setUser(null)
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`)
    }
  }, [status])

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const requestData = {
        username: username,
        password: password,
       
      }

      const response = await axios.post(
        'http://localhost:3001/api/login',
        requestData
      );

      const token = response.data.token;
      localStorage.setItem('jwt', token);
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setStatus(response.data)
      navigate('/browseRecipes')
    }
    catch (err){
      console.log(`Received server error: ${err}`)
        setError(
          err.response.data.message
        )

    }
  }

   /* fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok){
          return response.json()
        }
        else if (response.status === 401){
          throw new Error('Invalid Username or Password')
        }
        console.log(`Received server response: ${response.data}`)
        setStatus(response.data)
      })
      .then(data => {
        setUser(data)
        navigate('/browseRecipes')
      })
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "Failed to login, invalid username or password"
        )
      })


   */
  if (!status.success)
    return (
      <form className='login-form' onSubmit={handleSubmit}>
        <main className="App">
          <h1>Chef-It-Up Login</h1>
          <div class="formField">
            <label className='login-label' htmlFor="username_field">Username:</label>
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
            <label className='login-label' htmlFor="password_field">Password:</label>
            <br />
            <input
              id="password_field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div>
              <p className="notwork">{error}</p>
            </div>
          )}
          <div>
            <div>
              <button className="submit-login-form-button" type="submit"> Login </button>
            </div>
            <div>
              <Link to="/register">
                <button className="navigate-to-register-button" type="submit"> Not a User? Register </button>
              </Link>
            </div>

          </div>
         
        </main>
      </form>
    );
  else return <Navigate to="/browseRecipes" />
}

export default Login;
