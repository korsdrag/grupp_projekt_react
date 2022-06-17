import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import { bootstrap } from 'react-bootstrap'
import button from 'react-bootstrap/Button';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const todoNameRef = useRef()
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  const [todos, setTodos] = useState(storedTodos)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

  function handleAddTodo(){
    const name = todoNameRef.current.value
    if (name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
