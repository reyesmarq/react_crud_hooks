import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import ListItem from './ListItem'

const App = () => {
  let todosInitialState = [
    { id: 1, name: 'Buy some clothes' },
    { id: 2, name: 'Write some code' },
    { id: 3, name: 'fix scheduler' },
    { id: 4, name: 'Play golf' },
  ]

  const generateTodoId = () => {
    const lastTodo = todos[todos.length - 1]
    if (lastTodo) return lastTodo.id + 1

    return 1
  }
  
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(todosInitialState)
  const [editingTodo, setEditingTodo] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)

  const handleInputChange = (event) => {
    setNewTodo(event.target.value)
  }

  const addTodo = () => {
    setTodos([...todos, {id: generateTodoId(), name: newTodo}])
    setNewTodo('')
  }

  const editTodo = (index) => {
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
                
                <ListItem
                  key={ todo.id }
                  todo={ todo }
                  editTodo={ () => { editTodo(index) } }
                  deleteTodo={ () =>  { deleteTodo(index) } }
                />
                
              ))
            }
          </ul>
        }
        
      </div>
    </div>
  )
}

export default App
