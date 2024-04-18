import './Register.css'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Select from 'react-select'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [response, setResponse] = useState({});
  const navigate = useNavigate()
  
  const options = [
    { value: 'Basic-Fridge', label: 'Basic-Fridge' },
    { value: 'Vegetarian-Fridge', label: 'Vegetarian-Fridge' },
    { value: 'Meat-Fridge', label: 'Meat-Fridge' },
    { value: 'None', label: 'None' },
  ]
  const [starter, setStarter] = useState(options[0].value)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const requestData = {
        username: username,
        password: password,
        starter: starter,
      }

      const response = await axios.post(
        'http://localhost:3001/api/register',
        requestData
      );
      
      const token = response.data.token;
      const userId = response.data.userId
      localStorage.setItem('userId', userId)
      localStorage.setItem('jwt', token);
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
      navigate('/browseRecipes')
    }
    catch (error){
      setError(
        error.response.data.message
      );
    }
       
  }

  /*fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, starter }),
    })
      .then(response => {
        if (response.ok){
          navigate('/')
          return response.json()
        }
        else if (response.status === 401){
          throw new Error('Invalid Username or Password')
        }
        console.log(`Received server response: ${response.data}`)
      })
      .catch(err => {
        console.log(`Received server error: ${err}`)
        setError(
          "Failed to login, invalid username or password"
        )
      })
      */

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <main className="App">
        <h1>Register</h1>
        <div class="formField">
          <label className='register-label' htmlFor="username_field">Enter your Username:</label>
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
          <label className='register-label' htmlFor="password_field">Enter your Password:</label>
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
        <h2>Select a starter Fridge</h2>
        <div class="dropdown">
          
          <Select options={options} defaultValue={options[0]} onChange={e => setStarter(e.value)} />
        </div>
        {error && (
            <div>
              <p className="notwork">{error}</p>
            </div>
        )}
        <div>
          <div>
            <button className="submit-register-form-button" type="submit"> Register </button>
          </div>
          <div>
            <Link to="/">
            <button className="navigate-to-login-button" type="submit"> Return to Login</button>
            </Link>
          </div>

        </div>
        
      </main>
    </form>
  );
}

export default Register;
