import React, {useState} from 'react';
import "../styles/SignUp.css";
import LogoLongDark from './icons/LogoLongDark';
function SignUp() {

  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // test data coming in from form
    console.log(formData);
  };

  return (
    <div className="signup">
        <div className='signup-container'>
        <h1 className='title'> 
        <LogoLongDark/>
         </h1>
          <h2>Create an Account now!</h2>
          <form className='signup-container__form'>
            <label htmlFor='username'>Username:</label>
            <input
            type="text"
            id="username"
            />

            <label htmlFor='email'>Email:</label>
            <input
            type="text"
            id="email"
            />

            <label htmlFor='password'>Password:</label>
            <input
            type="text"
            id="password"
            />

            <label htmlFor='password-confirmation'>Password Confirmation:</label>
            <input
            type="text"
            id="password-confirmation"
            />
          <button type='submit'>Sign Up</button>
          <p>Already have an account? Login Here(link)</p>
          </form>
        </div>
    </div>
  );
}

export default SignUp;