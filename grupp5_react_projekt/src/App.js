import './App.css';
import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">

      <TodoList />
      <input type="text"></input>
      <button>Add todo</button>
    </div>
  );
}

export default App;
