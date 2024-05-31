import React, {useState} from 'react';
import LogoLongDark from './icons/LogoLongDark';
import "../styles/Login.css";
import axios from 'axios';

function Login() {

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sessions', formData);
      console.log(response.data);
    }
    catch (error) {
      console.error('Error sending data:', error)
    }
  };

  return (
    <div className="login">
      <div className='login-container'>
        <h1 className='title'>
        <LogoLongDark/>
        </h1>
          <h2>Login now!</h2>
          <form className='login-container__form' onSubmit={handleSubmit}>
            <label htmlFor='usernameOrEmail'>Username/Email:</label>
            <input
            type="text"
            id="usernameOrEmail"
            name='usernameOrEmail'
            value={formData.usernameOrEmail || formData.email}
            onChange={handleChange}
            />

            <label htmlFor='password'>Password:</label>
            <input
            type="password"
            id="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            />

          <button type='submit'>Login</button>
          <p>Don't have an account? Sign up here(link)</p>
          </form>
      </div>
    </div>
  );
}

export default Login;