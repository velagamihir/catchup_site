import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Main";
import "./App.css";
import Login from "./Components/Login";
import NewsUpload from "./Components/NewsUpload";
import Team from "./Components/Team";
import RecentUploads from "./Components/RecentUploads";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./Components/NotFound";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/newsUpload" element={<NewsUpload />} />
        </Route>
        <Route path="/team" element={<Team />} />
        <Route path="/recentUploads" element={<RecentUploads />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
