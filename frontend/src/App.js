import React from "react";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import SearchPage from "./pages/SearchPage";
import { Routes, Route, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/addemployee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
