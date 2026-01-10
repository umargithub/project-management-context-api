import { formatDate } from "../utils/dateFormatter";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default function ProjectDetails({
  project,
  onDelete,
  addTodo,
  deleteTodo,
}) {
  return (
    <main className="flex-1 p-16">
      <div className="max-w-3xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-stone-800 text-4xl font-bold mb-2">
              {project.title}
            </h1>
            <p className="text-stone-500 text-lg mb-4">
              {formatDate(project.date)}
            </p>
            {/* <p className="text-stone-700 mb-2">
              Learn React from the group up.
            </p> */}
            <p className="text-stone-700">{project.description}</p>
          </div>
          <button
            onClick={onDelete}
            className="px-6 py-2 text-white hover:bg-red-500 bg-red-400 rounded-md font-bold cursor-pointer"
          >
            Delete
          </button>
        </div>

        <hr className="border-stone-300 mb-8" />

        <div>
          <h2 className="text-stone-800 text-2xl font-bold mb-6">Tasks</h2>

          <TodoForm addTodo={addTodo} />

          <div className="space-y-4">
            {project.todos &&
              project.todos.map((todo) => (
                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
