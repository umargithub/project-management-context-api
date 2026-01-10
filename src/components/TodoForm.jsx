import { useRef, useState } from "react";

export default function TodoForm({ addTodo }) {
  const todo = useRef();

  function handleAddTodo(value) {
    if (!value) {
      return;
    }
    const newTodo = {
      id: crypto.randomUUID(),
      title: value,
    };
    addTodo(newTodo);
    todo.current.value = "";
  }
  return (
    <div className="flex gap-4 mb-8">
      <input
        ref={todo}
        type="text"
        placeholder=""
        className="flex-1 px-4 py-3 border-2 border-blue-500 rounded focus:outline-none"
      />
      <button
        onClick={() => handleAddTodo(todo.current.value)}
        className="px-6 py-2 text-white font-bold bg-green-400 rounded-md hover:bg-green-500 cursor-pointer"
      >
        Add Task
      </button>
    </div>
  );
}
