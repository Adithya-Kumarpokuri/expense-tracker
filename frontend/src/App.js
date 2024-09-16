import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Home from './Home'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
