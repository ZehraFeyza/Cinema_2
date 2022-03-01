import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import LoginPage from "../pages/LoginPage";
import MoviesPage from "../pages/MoviesPage";
import PrivateRoute from "./PrivateRoutes";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <MoviesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movie/:movieId"
        element={
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default CustomRoutes;