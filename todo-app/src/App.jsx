import { useState, useEffect } from "react";
import "./App.css";

// Main App Component
const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  // Toggle the completion status of a todo
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Remove a todo
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-4">Todo List</h1>

      <form onSubmit={addTodo} className="flex justify-center mt-4">
        <input
          type="text"
          className="p-2 border rounded w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Add Todo
        </button>
      </form>

      <div className="mt-4">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 mb-2 border rounded ${
              todo.completed ? "bg-green-300" : "bg-red-300"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="mr-2"
              />
              <span
                className={`cursor-pointer ${
                  todo.completed ? "line-through" : ""
                }`}
                onClick={() => toggleTodo(index)}
              >
                {todo.text}
              </span>
            </div>
            <div className="ml-4 text-sm font-medium">
              Status:{" "}
              <span
                className={`${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.completed ? "Done" : "Not Done"}
              </span>
            </div>
            <button
              className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
