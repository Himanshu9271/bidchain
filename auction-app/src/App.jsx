import { useState } from "react";

import viteLogo from "/vite.svg";
import { auth } from "./firebase/firebaseConfig";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignupComponent";
import Auction from "./components/Auction";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/auction" element={<Auction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
