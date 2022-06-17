import React from "react";

export default function Todo({ todoItem, toggleTodo }) {
    // Uses the imported function to send the current id to be used by the function in App.js
    function handleTodoClick() {
        toggleTodo(todoItem.id)
    }

  // Returns a checkbox and the name of todoItem 
  return (
    <div>
      <label>
        <input type="checkbox" checked={todoItem.complete} onChange={handleTodoClick}></input>
        {todoItem.name}
      </label>
    </div>
  );
}
