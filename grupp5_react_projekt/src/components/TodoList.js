import React from 'react'
import Todo from './Todo'

export default function TodoList( { todoList, toggleTodo } ) {
  return (
    // Loops over the todoList prop and sends the generated id/key, todoItem name and the toggleTodo function to the <Todo /> component
    todoList.map( todoItem => { 
        return <Todo key={todoItem.id} todoItem={todoItem} toggleTodo={toggleTodo}/>
    } ) 
  ) 
}
