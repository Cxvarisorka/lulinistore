import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Register.css';

function Register(){
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        confrimPassword: ''
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
      };
    
      const handleInputChange = (e) => {
        // Update form data state when input values change
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      return (
        <form onSubmit={handleSubmit} id="sign-up">
          <h2>Sign Up</h2>
          <label>
            Firstname
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Lastname
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Confrim Password
            <input
              type="password"
              name="confrimPassword"
              value={formData.confrimPassword}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
}

export default Register;