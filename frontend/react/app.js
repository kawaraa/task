import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Profile from "./profile.js";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      {/* <aside className="side-menu">
        <a href="">My Profile</a>
        <a href="">My Profile</a>
        <a href="">My Profile</a>
        <a href="">My Profile</a>
        <a href="">My Profile</a>
        <a href="">My Profile</a>
        <a href="">My Profile</a>
      </aside> */}
      <Profile />
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
