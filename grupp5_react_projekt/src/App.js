import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from "uuid";

// Stores the created key in a variable so it can be referenced easily
const LOCAL_STORAGE_KEY = "todoApp.todos";


function App() {
   // Retreiving the todos[] objects from local storage by using the stored key variable to identify what part of local storage to retreive from
   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  
   // Creating a todos array and defining a setTodos() function to be used for modifying the todos array
   const [todos, setTodos] = useState(storedTodos);
   
   // Declares todoNameRef to be used for getting the data inside the text input field
   const todoNameRef = useRef();

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)

  }

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(local_sotrage_key))
    if(storedTodos)setTodos(storedTodos)
  },[])

  useEffect(() => {

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));

  }, [todos]);

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <div className="App">
      <TodoList todos = {todos}/>
      <input ref = {todoNameRef} type ="text"></input>
      <button onClick = {handleAddTodo}>Add todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </div>
  );
}

export default App;
