import './App.css';
import React from 'react';
import DisplayCustomerData from "./displayCustomerData";
import GetCustomerCredits from "./getCustomerCredits";

export default function App() {
  return (
    <div className="App">
        <h1>Welcome to reward program</h1>
        <DisplayCustomerData/>
        <GetCustomerCredits/>
    </div>
  );
}

