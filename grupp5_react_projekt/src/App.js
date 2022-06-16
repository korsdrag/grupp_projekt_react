import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const [todos, setTodos] = useState(storedTodos);
  const todoNameRef = useRef();
  
  //används om react.strictmode inte används
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storedTodos) setTodos(storedTodos)
  // },[])



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(x => x.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") {
      return;
    }
    setTodos((x) => {
      return [...x, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }
  function clearTodo() {
    const newTodos = todos.filter(x => !x.complete)
    setTodos(newTodos);
  }
  
  console.log(todos);
  return (
    <div className="App">
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={clearTodo}>Clear todo</button>
      <p>{todos.filter(x => !x.complete).length} left todo</p>
    </div>
  );
}

export default App;
