import React from "react";
import Landing from "./components/Landing/Landing";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
