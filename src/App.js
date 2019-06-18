import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Buy some clothes' },
    { id: 2, name: 'Write some code' },
    { id: 3, name: 'Write some code' },
    { id: 4, name: 'Play golf' },
  ])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CRUD HOOKS</p>
      </header>
      <div className="container">
        <h2 className="text-center">Todo</h2>
        <ul className="list-group">
          {
            todos.map(todo => (
              <li className="list-group-item">{todo.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
