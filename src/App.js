import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, name: 'Buy some clothes' },
    { id: 2, name: 'Write some code' },
    { id: 3, name: 'Write some code' },
    { id: 4, name: 'Play golf' },
  ])

  const handleInputChange = (event) => {
    setNewTodo(event.target.value)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CRUD HOOKS</p>
      </header>
      <div className="container">
        <h2 className="text-center">Todo</h2>

        <input
          type="text"
          name="todo"
          className="my-4 form-control"
          placeholder="Add todo"
          onChange={handleInputChange}
          value={newTodo}
        />
        
        <ul className="list-group">
          {
            todos.map(todo => (
              <li key={todo.id} className="list-group-item">{todo.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
