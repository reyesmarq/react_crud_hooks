import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  let todosInitialState = [
    { id: 1, name: 'Buy some clothes' },
    { id: 2, name: 'Write some code' },
    { id: 3, name: 'fix scheduler' },
    { id: 4, name: 'Play golf' },
  ]
  
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(todosInitialState)
  const [editingTodo, setEditingTodo] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)

  const handleInputChange = (event) => {
    setNewTodo(event.target.value)
  }

  const addTodo = () => {
    setTodos([...todos, {id: todos.length + 1, name: newTodo}])
    setNewTodo('');
  }

  const editTodo = (index) => {
    const todo = todos[index]
    setEditingTodo(true)
    setNewTodo(todos[index].name)
    setEditingIndex(index)
  }

  const updateTodo = () => {
    
    todos[editingIndex].name = newTodo
    setTodos([...todos])
    setEditingIndex(null)
    setEditingTodo(false)
    setNewTodo('')

  }

  const deleteTodo = (index) => {
    todos.splice(index, 1)
    setTodos([...todos])
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

        <button
          className="btn-info form-control mb-4"
          onClick={ !editingTodo ? addTodo : updateTodo }
        >
          { editingTodo ? 'Update todo' : 'Add todo' }
        </button>
        
        {
          !editingTodo &&
          <ul className="list-group">
            {
              todos.map((todo, index) => (
                <li key={todo.id} className="list-group-item">
                  {todo.name}

                  <button
                    className="btn-sm btn btn-danger ml-4"
                    onClick={ () => { deleteTodo(index) } }
                  >
                    X
                  </button>
                  <button
                    className="btn-sm btn btn-info ml-4"
                    onClick={ () => { editTodo(index) } }
                  >
                    U
                  </button>
                </li>
              ))
            }
          </ul>
        }
        
      </div>
    </div>
  );
}

export default App;
