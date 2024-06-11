import React, {useState} from 'react';
import "../styles/SignUp.css";
import LogoLongDark from './icons/LogoLongDark';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp({ onRegister }) {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CHECK IF PASSWORD === PASSWORD-CONFIRMATION HERE
    try {
      const response = await axios.post('/api/users', formData);
      console.log(response.data);
      // call function from props
      onRegister();
    }
    catch (error) {
      console.error('Error sending data:', error)
    }
    // clear the form fields
    setFormData({
      username: '',
      email: '',
      password: '',
    });

  };

  return (
    <div className="signup">
        <div className='signup-container'>
        <h1 className='title'> 
        <LogoLongDark/>
         </h1>
          <h2>Create an Account now!</h2>
          <form className='signup-container__form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

            <label htmlFor='email'>Email:</label>
            <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          <button type='submit'>Sign Up</button>
          <p>Already have an account? Login <Link to='/login'>Here</Link></p>
          </form>
        </div>
    </div>
  );
}

export default SignUp;