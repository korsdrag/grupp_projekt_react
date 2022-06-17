
import React from 'react'
import Todo from './Todo'

export default function TodoList( { todoList, toggleTodo } ) {
  return (
    todoList.map( todoItem => { 
        return <Todo key={todoItem.id} todoItem={todoItem} toggleTodo={toggleTodo}/>
    } ) 
  ) 
}