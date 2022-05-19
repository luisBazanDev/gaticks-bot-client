import React from "react";
import { Route, Routes } from "react-router-dom";
import AppProvider from "./providers/AppProvider";
import '@fortawesome/fontawesome-svg-core/styles.css'

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
