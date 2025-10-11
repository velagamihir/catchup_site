import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Main";
import "./App.css";
import Login from "./Components/Login";
import NewsUpload from "./Components/NewsUpload";
import Team from "./Components/Team";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newsUpload" element={<NewsUpload />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
};

export default App;
