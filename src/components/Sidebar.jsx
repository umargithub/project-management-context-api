import { useContext } from "react";
import { ProjectContext } from "../store/project-context";

export default function Sidebar() {
  const { projects, addNewProject, selectProject } = useContext(ProjectContext);
  return (
    <aside className="w-80 bg-stone-950 rounded-tr-2xl p-8">
      <h2 className="text-white text-2xl font-bold mb-8 uppercase">
        Your Projects
      </h2>
      <button
        onClick={addNewProject}
        className="px-6 py-3 bg-stone-800 text-stone-400 rounded-md hover:bg-stone-700 hover:text-stone-300 transition"
      >
        + Add Project
      </button>

      <ul className="mt-8 space-y-2">
        {projects.map((project) => (
          <li
            onClick={() => selectProject(project.id)}
            key={project.id}
            className="px-4 py-2 bg-stone-800 text-stone-200 rounded hover:bg-stone-700 cursor-pointer"
          >
            {project.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
