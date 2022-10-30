import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const toDoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      console.log(storedTodos)
      setTodos(prev => [...prev, ...storedTodos]);
      console.log(todos)
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) => {
    const name = toDoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    toDoNameRef.current.value = null
  }
  return (
    <div>
      <TodoList todos={todos} />
      <input ref={toDoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed todos</button>
      <div>0 left to do</div>
    </div>
  );
}

export default App;
