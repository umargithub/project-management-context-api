import clipboard from "../assets/no-projects.png";

export default function NoProject({ handleNewProject }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-16">
      <img
        src={clipboard}
        alt="No project"
        className="w-24 h-24 mb-8 opacity-50"
      />
      <h1 className="text-stone-600 text-3xl font-bold mb-4">
        No Project Selected
      </h1>
      <p className="text-stone-500 text-lg mb-8">
        Select a project or get started with a new one
      </p>
      <button
        onClick={handleNewProject}
        className="px-8 py-4 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition"
      >
        Create new project
      </button>
    </main>
  );
}
