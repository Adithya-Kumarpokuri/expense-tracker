// import React from "react";
// import styled from 'styled-components'
// import { useEffect,useState} from "react";
// import {Link} from "react-router-dom";
// import {useNavigate} from "react-router-dom"
// import axios from "axios";
// import Image from '../../img/bg.png';

// const BASE_URL = "http://localhost:5000/api/v1/";
// const Login=()=>
// {
//   const navigate=useNavigate();
//   const [inputState, setInputState] = useState({
//     email:'',
//     password:'',
// })
//   const {email,password}=inputState;
//   const handleInput = name => e => {
//     setInputState({...inputState, [name]: e.target.value})
// }

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const { email, password } = inputState;
//     const { data } = await axios.post(`${BASE_URL}login`, {
//       email,
//       password,
//     });

//     if (data.success === true) {
//       // Store token and user data in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user",JSON.stringify(data.user))
//       console.log("logged in",data.user.token)
//       //localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/Home");
//     } else {
//       alert("Login failed");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("An error occurred during login");
//   }
// };

//       return(
//        <FormStyled onSubmit={handleSubmit}>
//           <div className="page">
//           <div className="input-control">
//           <input
//            type="text"
//            value={email}
//            title="email"
//            placeholder="Enter your email"
//            onChange={handleInput('email')}
//           />
//           </div>
//           <div className="input-control">
//           <input
//           type="text"
//           value={password}
//           title="password"
//           placeholder="Enter the password"
//           onChange={handleInput('password')}
//           />
//           </div>
//           <button type="submit">Login</button>
//           <p>Doesn't hava a account?{" "}
//             <Link to="/register">Register</Link>
//           </p>
//           </div>
//         </FormStyled>
//       )
// }
// const FormStyled = styled.form`
//   .page {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;

//     /* 🔄 Static background image */
//     background-image: url(${Image}); /* Ensure bg.jpg is in public folder */
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//   }

//   .input-control {
//     margin-bottom: 1.5rem;
//     width: 100%;
//     max-width: 400px;
//   }

//   input {
//     width: 100%;
//     padding: 12px;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//     transition: border-color 0.3s ease-in-out, transform 0.3s ease;

//     &:focus {
//       outline: none;
//       border-color: #007bff;
//       transform: scale(1.05);
//       box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
//     }
//   }

//   button {
//     padding: 12px 20px;
//     font-size: 1rem;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

//     &:hover {
//       background-color: #0056b3;
//       box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
//     }
//   }

//   p {
//     margin-top: 1rem;
//     font-size: 0.9rem;
//     color: #fff;
//   }

//   a {
//     color: #ffd700;
//     text-decoration: none;
//     transition: color 0.3s ease;

//     &:hover {
//       text-decoration: underline;
//       color: #fff;
//     }
//   }
// `;
// export default Login;
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../../img/bg.png";

// MUI imports
import {
  Box,
  Button,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;
const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/Home");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login");
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="page">
        <Box className="form-box">
          <Typography variant="h4" gutterBottom sx={{ color: "Red", fontWeight: "bold" }}>
           Track. Save. Thrive
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleInput("email")}
            fullWidth
            sx={{ mb: 3, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "8px" }}
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleInput("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            sx={{ mb: 3, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "8px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
  type="submit"
  fullWidth
  sx={{
    padding: "12px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #ff6a00, #ee0979)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(45deg, #ee0979, #d6006d)",
    },
    mb: 2,
  }}
>
  Login
</Button>

          {/* <Typography variant="body2" sx={{ color: "#fff" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#ffd700", textDecoration: "none", fontWeight: "bold" }}
            >
              Register
            </Link>
          </Typography> */}
          <Typography variant="body2" sx={{ color: "#333" }}>
              Don't have an account?{" "}
          <Link
            to="/register"
            style={{
               color: "#ee0979",
               textDecoration: "none",
               fontWeight: "bold",
            }}
          >
           Register
          </Link>
          </Typography>
        </Box>
      </div>
    </FormStyled>
  );
};

export default Login;

const FormStyled = styled.form`
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    background-image: url(${Image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .form-box {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
  }
`;
