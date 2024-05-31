import React, {useState} from 'react';
import LogoLongDark from './icons/LogoLongDark';
import "../styles/Login.css";
function Login() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // test data coming in from form
    console.log(formData);
  };

  return (
    <div className="login">
      <div className='login-container'>
        <h1 className='title'>
        <LogoLongDark/>
        </h1>
          <h2>Login now!</h2>
          <form className='login-container__form' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username/Email:</label>
            <input
            type="text"
            id="username"
            name='username'
            value={formData.username || formData.email}
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