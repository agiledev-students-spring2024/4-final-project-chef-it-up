import './Register.css';
import { useState } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import Select from 'react-select'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const options = [
    { value: 'none', label: 'None' },
    { value: 'italian', label: 'Italian' },
    { value: 'french', label: 'French' },
    { value: 'american', label: 'American' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
  ]

  const [starter, setStarter] = useState(options[0].value)

  const handleSubmit = e => {
    e.preventDefault()
    
    axios
      .post("Backend",{
        username:username,
        password:password,
        starter:starter
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
        <h1>Login</h1>
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
        <div class="dropdown">
          <p>Select a Starter Fridge</p>
          <Select options={options} defaultValue={options[0]} onChange={e => setStarter(e.value)} />
        </div>
        {error && (
            <div>
              <p className="notwork">{error}</p>
              <Link to="/browseRecipes">Bypass Login due to Non-functionality</Link>
            </div>
        )}
        <div>
          <Link to="/">
            <input type="submit" value="Register"/>
          </Link>
        </div>
        <div>
          <p>Return to <Link to="/">Login</Link></p>
        </div>
      </main>
    </form>
  );
}

export default Register;
