import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import ListItem from './ListItem'

import Axios from 'axios'

const App = () => {

  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [notification, setNotification] = useState(null)

  const apiUrl = 'https://5ca83ceb8e58df0014603b00.mockapi.io'

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(`${apiUrl}/todos`)

      setTodos(response.data)
    }

    fetchData()
  }, [])

  const alert = (notification) => {
    setNotification(notification)

    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }
  
  const handleInputChange = (event) => {
    setNewTodo(event.target.value)
  }

  const addTodo = async () => {
    const response = await Axios.post(`${apiUrl}/todos`, {
      name: newTodo
    })

    setTodos([...todos, {id: response.data.id, name: newTodo}])
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

  const deleteTodo = async (index) => {
    await Axios.delete(`${apiUrl}/todos/${todos[index].id}`)

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
