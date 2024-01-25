import React, { useState } from "react";
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
  };

  const handleInputChange = (e) => {
    // Update form data state when input values change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} id="sign-in">
      <h2>Sign In</h2>
      <label>
        Email address
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Sign in</button>
      <p>Forgot your password?</p>
    </form>
  );
}

export default Login;
