import React, { useState, useEffect, memo } from "react";
import './App.css';

function App() {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [newTodo, setNewTodo] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    console.log("storedTodos", storedTodos);
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [todos]);
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (id, updatedText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="App">
       <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        placeholder="Thêm công việc mới"
      />
      <button onClick={handleAddTodo}>Thêm</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
              />
            }
            <button onClick={() => handleDeleteTodo(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(App);
