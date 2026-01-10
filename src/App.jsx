import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ProjectDetails from "./components/ProjectDetails";
import Sidebar from "./components/Sidebar";
import NoProject from "./components/NoProject";

function App() {
  const [projects, setProjects] = useState([]);
  console.log(projects);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject =
    selectedProjectId === "new"
      ? null
      : projects.find((project) => project.id === selectedProjectId);

  function handleNewProject() {
    setSelectedProjectId("new");
  }

  function handleCancelProject() {
    setSelectedProjectId(null);
  }

  function handleSelectProject(id) {
    setSelectedProjectId(id);
  }

  function handleAddProject(title, description, date) {
    const newProject = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
    };

    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setSelectedProjectId(newProject.id);
  }

  function handleDeleteProject() {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== selectedProjectId)
    );
    setSelectedProjectId(null);
  }

  function addTodo(task) {
    setProjects((prevProject) =>
      prevProject.map((project) => {
        // if (project.id === selectedProjectId) {
        //   if (project.todos) {
        //     return { ...project, todos: [...project.todos, task] };
        //   } else {
        //     return { ...project, todos: [task] };
        //   }
        // }
        // return project;

        return project.id === selectedProjectId
          ? { ...project, todos: [...(project.todos || []), task] }
          : project;
      })
    );
  }

  function deleteTodo(todoId) {
    setProjects((prevProject) =>
      prevProject.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              todos: project.todos.filter((todo) => todo.id !== todoId),
            }
          : project
      )
    );
  }
  return (
    <div className="flex min-h-screen bg-white-900">
      <Sidebar
        handleNewProject={handleNewProject}
        projects={projects}
        handleSelectProject={handleSelectProject}
      />
      {selectedProjectId === null && (
        <NoProject handleNewProject={handleNewProject} />
      )}
      {selectedProjectId === "new" && (
        <Form
          handleCancelProject={handleCancelProject}
          handleAddProject={handleAddProject}
        />
      )}
      {selectedProjectId && selectedProjectId !== "new" && (
        <ProjectDetails
          project={selectedProject}
          onDelete={handleDeleteProject}
          addTodo={addTodo}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
