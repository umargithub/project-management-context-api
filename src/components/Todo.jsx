export default function Todo({ todo, deleteTodo }) {
  return (
    <div className="flex justify-between items-center p-4 bg-stone-100 rounded">
      <span className="text-stone-800">{todo.title}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-stone-700 hover:text-red-600 cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
}
