import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

// Stores the created key in a variable so it can be referenced easily
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  // Retreiving the todos[] objects from local storage by using the stored key variable to identify what part of local storage to retreive from
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  // Creating a todos array and defining a setTodos() function to be used for modifying the todos array
  const [todos, setTodos] = useState(storedTodos);

  // Declares todoNameRef to be used for getting the data inside the text input field
  const todoNameRef = useRef();

  // Används om react.strictmode inte används
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storedTodos) setTodos(storedTodos)
  // },[])

  // Stores the ojbects in todo[] in local storage by converting the objects to JSON strings
  // This useEffect is called everytime todo[] changes/updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Enables toggling by creating a new array called newTodosToggle and then finding
  function toggleTodo(id) {
    // Copying todos[] to newTodos[]
    const newTodosToggle = [...todos];
    const oldTodosToggle = newTodosToggle.find((x) => x.id === id);

    // Inverting the value of oldTodos[] .complete value
    oldTodosToggle.complete = !oldTodosToggle.complete;

    // Setting todos[] to the newTodos[]
    setTodos(newTodosToggle);
  }

  function handleAddTodo() {
    // Name is set to the current value of todoNameRef (the value inside the text input) to later be used when adding new objects to todos[]
    const name = todoNameRef.current.value;

    // Handles exception of empty entries by user
    if (name === "") {
      return;
    }

    // Adds new todo entry to existing array of todo objects
    // uuidv4 is an imported method used to generate a new unique key for each new object in todos[]
    setTodos((prevState) => {
      return [...prevState, { id: uuidv4(), name: name, complete: false }];
    });

    // Clears input field after user has saved their entry
    todoNameRef.current.value = null;
  }

  // Filters out todo objects that are not set to complete and stores the objects that are set to complete in a new array called newTodos
  function handleClearTodo() {
    const newTodosClear = todos.filter((prevState) => !prevState.complete);
    // Sets the content of todos[] to the new filtered newTodos[]
    setTodos(newTodosClear);
  }

  function handleClearList() {
    setTodos([]);
  }

  console.log(todos);
  return (
    <div className="d-flex flex-column p-2">
      {/* Sends todos[] and toggleTodo() to <TodoList /> and renders the return */}
      <div className="d-flex justify-content-center flex-column fw-bold">
        <TodoList todoList={todos} toggleTodo={toggleTodo} />
      </div>
      <div className="d-flex justify-content-center ">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">TODO</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex. Mow lawn"
              ref={todoNameRef}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="d-flex justify-content-center p-2">
        <Button variant="success" onClick={handleAddTodo}>
          Add todo
        </Button>
        <Button variant="warning" onClick={handleClearTodo}>
          Remove todo
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="danger" onClick={handleClearList}>
          Clear list
        </Button>
      </div>
      <p className="d-flex justify-content-center p-2">
        {todos.filter((x) => !x.complete).length} left todo
      </p>
    </div>
  );
}

export default App;
