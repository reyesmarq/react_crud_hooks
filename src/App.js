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

  // state
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(todosInitialState)
  const [editingTodo, setEditingTodo] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [notification, setNotification] = useState(null)

  const generateTodoId = () => {
    const lastTodo = todos[todos.length - 1]
    if (lastTodo) return lastTodo.id + 1

    return 1
  }

  const alert = (notification) => {
    setNotification(notification)

    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }
  
  const handleInputChange = (event) => {
    setNewTodo(event.target.value)
  }

  const addTodo = () => {
    setTodos([...todos, {id: generateTodoId(), name: newTodo}])
    setNewTodo('')
    alert('Todo added successfully')
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
    alert('Todo updated successfully')
  }

  const deleteTodo = (index) => {
    todos.splice(index, 1)
    setTodos([...todos])
    alert('Todo deleted successfully')
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CRUD HOOKS</p>
      </header>
      <div className="container">
        <h2 className="text-center">Todo</h2>

        {
          notification &&
          <div className="alert alert-success">
            <p className="text-center">{ notification }</p>
          </div>
        }
        
        <input
          type="text"
          name="todo"
          className="my-4 form-control"
          placeholder="Add todo"
          onChange={handleInputChange}
          value={newTodo}
        />

        <button
          className={ newTodo.length < 5 ? "btn-default form-control mb-4" : "btn-info form-control mb-4" }
          onClick={ !editingTodo ? addTodo : updateTodo }
          disabled={ newTodo.length < 5 }
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
