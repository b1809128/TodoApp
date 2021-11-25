import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  
  const getData = () => {
    const local = localStorage.getItem("newTodos");
    if (local) {
      // console.log(JSON.parse(local));
      return JSON.parse(local);
    } else {
      return [];
    }
  };
  
  const data = getData();
  const [todos, setTodos] = useState(data);

  // Them vao list
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    localStorage.setItem("newTodos", JSON.stringify(newTodos));
    setTodos(newTodos);
    
  };

  const testLocal = (id, value) => {
    const test = [...todos];
    const up = test.map((data) => {
      return data.id === id ? value : data;
    });
    localStorage.setItem("newTodos", JSON.stringify(up));
    // console.log("this is test" + up);
  };
  //Update theo id
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    testLocal(todoId, newValue);
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //Xoa theo id
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
    localStorage.setItem("newTodos", JSON.stringify(removedArr));
  };

  //Kiem tra da hoan thanh chua
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    localStorage.setItem("newTodos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={data}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
