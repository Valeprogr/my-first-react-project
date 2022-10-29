import React, {useState} from "react";
import TodoList from "./TodoList";


function App() {
  const[todos,setTodos]= useState(['Todo1','Todo2']);
  return (
    <div>
      <TodoList todos={todos}/>
      <input type="text" />
      <button>Add Todo</button>
      <button>Clear Completed todos</button>
      <div>0 left to do</div>
    </div>
  );
}

export default App;
