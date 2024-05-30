import React, {useState} from 'react';

function SignUp() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  return (
    <div className="SignUp">
      <h1 className='title'> Portfolio Prophet </h1>
        <div className='signup_container'>
          <h2>Create an Account now!</h2>
          <form>
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
            type="password"
            id="password"
            />

            <label htmlFor='password-confirmation'>Password Confirmation:</label>
            <input
            type="text"
            id="password-confirmation"
            />
          </form>
          <button type='submit'>Sign Up</button>
          <p>Already have an account? Login Here(link)</p>
        </div>
    </div>
  );
}

export default SignUp;