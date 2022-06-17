import React from "react";

export default function Todo({ todoItem, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todoItem.id)
    }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todoItem.complete} onChange={handleTodoClick}></input>
        {todoItem.name}
        
      </label>
    </div>
  );
}