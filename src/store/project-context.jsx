import { createContext, useState } from "react";

export const ProjectContext = createContext({
  projects: [],
  selectedProjectId: null,
  selectedProject: null,
  addNewProject: () => {},
  addProject: () => {},
  cancelProject: () => {},
  selectProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(undefined);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  function selectProject(id) {
    setSelectedProjectId(id);
  }

  function addNewProject() {
    setSelectedProjectId(null);
  }

  function addProject(project) {
    const newProject = { id: crypto.randomUUID(), ...project };
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setSelectedProjectId(newProject.id);
  }

  function cancelProject() {
    setSelectedProjectId(undefined);
  }

  function deleteProject(id) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
    setSelectedProjectId((prevId) => (prevId === id ? undefined : prevId));
  }

  function addTask(task) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) =>
        project.id === selectedProjectId
          ? { ...project, tasks: [task, ...(project.tasks || [])] }
          : project
      );
    });
  }

  function deleteTask(id) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              tasks: project?.tasks.filter((task) => task.id !== id),
            }
          : project
      )
    );
  }

  const contextValue = {
    projects,
    selectedProjectId,
    selectedProject,
    addNewProject,
    addProject,
    cancelProject,
    selectProject,
    deleteProject,
    addTask,
    deleteTask,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}
