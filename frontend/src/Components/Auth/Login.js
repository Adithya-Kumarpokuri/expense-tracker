import React from "react";
import styled from 'styled-components'
import { useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const Login=()=>
{
  const navigate=useNavigate();
  const [inputState, setInputState] = useState({
    email:'',
    password:'',
})
  const {email,password}=inputState;
  const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
}
const handleSubmit = async (e) => {
  e.preventDefault()
  const {email,password}=inputState;
  const {data}=await axios.post(`${BASE_URL}login`,{
    email,
    password,
  });
  if(data.success===true){
    localStorage.setItem("user",JSON.stringify(data.user))
     navigate("/Home");
  }
};
      return(
       <FormStyled onSubmit={handleSubmit}>
          <div className="page">
          <div className="input-control">
          <input
           type="text"
           value={email}
           title="email"
           placeholder="Enter your email"
           onChange={handleInput('email')}
          />
          </div>
          <div className="input-control">
          <input
          type="text"
          value={password}
          title="password"
          placeholder="Enter the password"
          onChange={handleInput('password')}
          />
          </div>
          <button type="submit">Login</button>
          <p>Doesn't hava a account?{" "}
            <Link to="/register">Register</Link>
          </p>
          </div>
        </FormStyled>
      )
}
const FormStyled = styled.form`
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(270deg, #ff6a00, #ee0979, #007bff);
    background-size: 400% 400%;
    animation: gradientAnimation 10s ease infinite;
    transition: background-color 0.3s ease;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .input-control {
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 400px;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease-in-out, transform 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      transform: scale(1.05);  /* Slightly scale up on focus */
      box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
    }
  }

  button {
    padding: 12px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      background-color: #0056b3;
      box-shadow: 0 0 15px rgba(0, 123, 255, 0.6); /* Glow effect on hover */
    }
  }

  p {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #333;
  }

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: #0056b3;
    }
  }
`;
export default Login;
