import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
