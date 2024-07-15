// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div  className="felx w-full h-full justify-center items-center">

  <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/todoList" element={<TodoList />} />
      </Routes>
    </Router>
  </div>
  );
};



export default App;
