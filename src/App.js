import React from 'react';
import FileUpload from './components/FileUpload';
// import axios from "axios";

import logo from './media/logo_transparent.png'

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {

  return (
    <div className="app_container">
      <div className="app_row">
        <div className="app_logo">
          <img className="logo" src={logo} alt=""></img>
        </div>
      </div>
      <div className="app_row">
        <h1>
          Make those who break the rules accountable
        </h1>
      </div>
      <div className="app_row" style={{ flexDirection: "column" }}>
        <h2 style={{ alignSelf: "center" }}>
          <u>Instructions</u>
        </h2>
        <h2 style={{ alignSelf: "flex-start" }}>
          (1) Upload images and videos to the blockchain.
        </h2>
        <h2 style={{ alignSelf: "flex-start" }}>
          (2) Receive a link.
        </h2>
        <h2 style={{ alignSelf: "flex-start" }}>
          (3) Let the World know!
        </h2>
      </div>
      <div className="app_row">
        <FileUpload />
      </div>
    </div>
  );
}

export default App;