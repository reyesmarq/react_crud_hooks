import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CRUD HOOKS</p>
      </header>
      <div className="container">
        <h2 className="text-center">Todo</h2>
        <ul className="list-group">
          <li className="list-group-item">Buy some clothes</li>
          <li className="list-group-item">Write some code</li>
          <li className="list-group-item">Watch netflix</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
