import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"
import 'bootstrap/dist/css/bootstrap.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const toDoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);

  }, []);
  //console.log(todos)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  console.log(todos)
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = toDoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    toDoNameRef.current.value = null
  }
  //console.log(todos)
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return (
    <div className="container">
      <div className="header">
        <h1>Today</h1>
        <h3>{day + ' / ' + month + ' / ' + year}</h3>
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input className="form-control" ref={toDoNameRef} type="text" />
      <div className="container-btn ">
      <button className="btn btn-light" onClick={handleAddTodo}>Add Todo</button>
      <button className="btn btn-light" onClick={handleClearTodos}>Delete</button>
      </div>
     
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
