import { useContext, useRef, useState } from "react";
import { ProjectContext } from "../store/project-context";

export default function Form() {
  const { addProject, cancelProject } = useContext(ProjectContext);
  const title = useRef();
  const description = useRef();
  const date = useRef();

  const [error, setError] = useState(false);

  function handleSubmit(title, description, date) {
    if (!title || !description || !date) {
      setError(true);
      return;
    }
    addProject({ title, description, date });
    setError(false);
  }

  return (
    <main className="flex-1 p-16">
      <div className="max-w-2xl">
        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={cancelProject}
            className="px-6 py-2 text-stone-800 hover:text-stone-600"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              handleSubmit(
                title.current.value,
                description.current.value,
                date.current.value
              )
            }
            className="px-6 py-2 bg-stone-900 text-stone-200 rounded-md hover:bg-stone-800"
          >
            Save
          </button>
        </div>

        <div className="space-y-6">
          {error && (
            <p className="text-red-600 font-bold mb-2 uppercase">
              All fields are required
            </p>
          )}
          <div>
            <label className="block text-stone-700 font-bold mb-2 uppercase text-sm">
              Title
            </label>
            <input
              ref={title}
              type="text"
              className="w-full px-4 py-3 bg-stone-200 border-b-2 border-stone-400 focus:border-stone-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-2 uppercase text-sm">
              Description
            </label>
            <textarea
              ref={description}
              rows="4"
              className="w-full px-4 py-3 bg-stone-200 focus:outline-none focus:bg-stone-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-2 uppercase text-sm">
              Due Date
            </label>
            <input
              ref={date}
              type="date"
              className="w-full px-4 py-3 bg-stone-200 focus:outline-none focus:bg-stone-300"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
