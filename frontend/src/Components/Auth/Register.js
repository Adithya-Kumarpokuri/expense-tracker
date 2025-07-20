// import React from "react";
// import { useEffect,useState} from "react";
// import {useNavigate} from "react-router-dom"
// import axios from "axios";
// import styled from "styled-components";
// const BASE_URL = "http://localhost:5000/api/v1/";
// const Login=()=>
// {
//   const navigate=useNavigate();
//   const [inputState, setInputState] = useState({
//     name:'',
//     email:'',
//     password:'',
// })
//   const {name,email,password}=inputState;
//   const handleInput = name => e => {
//     setInputState({...inputState, [name]: e.target.value})
// }
// const handleSubmit = async (e) => {
//   console.log("registering");
//   e.preventDefault()
//   const {name,email,password}=inputState;
//   const {data}=await axios.post(`${BASE_URL}register`,{
//     name,
//     email,
//     password,
//   });
//   // if(data.success===true){
//   //   localStorage.setItem("user",JSON.stringify(data.user))
//   //    navigate("/Home");
//   // }
//   if (data.success === true) {
//       // Store token and user data in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user",JSON.stringify(data.user))
//       //localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/Home");
// }
// };
//       return(
//         <FormStyled onSubmit={handleSubmit}>
//           <div className="page">
//           <div className="input-control">
//           <input
//            type="text"
//            value={name}
//            title="name"
//            placeholder="Enter your Name"
//            onChange={handleInput('name')}
//           />
//           </div>
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
//     background: linear-gradient(270deg, #ff6a00, #ee0979, #007bff);
//     background-size: 600% 600%;
//     animation: gradientAnimation 8s ease infinite;
//   }

//   @keyframes gradientAnimation {
//     0% {
//       background-position: 0% 50%;
//     }
//     50% {
//       background-position: 100% 50%;
//     }
//     100% {
//       background-position: 0% 50%;
//     }
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
//     box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
//     transition: all 0.3s ease;

//     &:focus {
//       outline: none;
//       border-color: #007bff;
//       box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
//     }
//   }

//   button {
//     padding: 10px 20px;
//     font-size: 1.1rem;
//     font-weight: bold;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     width: 100%;
//     max-width: 400px;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #0056b3;
//     }
//   }

//   button:disabled {
//     background-color: #c0c0c0;
//     cursor: not-allowed;
//   }

//   .input-control input[type="text"] {
//     background-color: #fff;
//     color: #333;
//   }

//   .input-control input::placeholder {
//     color: #999;
//     font-size: 0.9rem;
//   }

//   .input-control input[type="password"] {
//     letter-spacing: 0.1em;
//   }

//   @media screen and (max-width: 768px) {
//     .input-control {
//       width: 90%;
//     }

//     button {
//       width: 90%;
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
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//const BASE_URL = "http://localhost:5000/api/v1";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;


const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputState;

  const handleInput = (field) => (e) => {
    setInputState({ ...inputState, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/Home");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration");
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="page">
        <Box className="form-box">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "Red", fontWeight: "bold" }}
          >
           Smarter spending starts here.
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleInput("name")}
            fullWidth
            required
            sx={{
              mb: 3,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleInput("email")}
            fullWidth
            required
            sx={{
              mb: 3,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleInput("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            sx={{
              mb: 3,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
            }}
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
            Register
          </Button>

          <Typography variant="body2" sx={{ color: "#333" }}>
             have an account?{" "}
          <Link
             to="/"
             style={{
             color: "#ee0979",
             textDecoration: "none",
             fontWeight: "bold",
            }}
          >
          Login
          </Link>
          </Typography>
        </Box>
      </div>
    </FormStyled>
  );
};

export default Register;

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
