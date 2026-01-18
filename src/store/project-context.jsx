import { createContext, useReducer, useState } from "react";

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

function projectsReducer(state, action) {
  switch (action.type) {
    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
      };

    case "ADD_NEW_PROJECT":
      return {
        ...state,
        selectedProjectId: null,
      };

    case "ADD_PROJECT":
      const newProject = { id: crypto.randomUUID(), ...action.payload };
      return {
        projects: [newProject, ...state.projects],
        selectedProjectId: newProject.id,
      };

    case "CANCEL_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
      };

    case "DELETE_PROJECT":
      return {
        projects: state.projects.filter(
          (project) => project.id !== action.payload,
        ),
        selectedProjectId:
          state.selectedProjectId === action.payload
            ? undefined
            : state.selectedProjectId,
      };

    case "ADD_TASK":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === state.selectedProjectId
            ? { ...project, tasks: [action.payload, ...(project.tasks || [])] }
            : project,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === state.selectedProjectId
            ? {
                ...project,
                tasks: project?.tasks.filter(
                  (task) => task.id !== action.payload,
                ),
              }
            : project,
        ),
      };

    default:
      return state;
  }
}

export function ProjectContextProvider({ children }) {
  const [projectState, projectsDispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProjectId: undefined,
  });

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId,
  );

  function selectProject(id) {
    projectsDispatch({
      type: "SELECT_PROJECT",
      payload: id,
    });
  }

  function addNewProject() {
    projectsDispatch({
      type: "ADD_NEW_PROJECT",
    });
  }

  function addProject(project) {
    projectsDispatch({
      type: "ADD_PROJECT",
      payload: project,
    });
  }

  function cancelProject() {
    projectsDispatch({
      type: "CANCEL_PROJECT",
    });
  }

  function deleteProject(id) {
    projectsDispatch({
      type: "DELETE_PROJECT",
      payload: id,
    });
  }

  function addTask(task) {
    projectsDispatch({
      type: "ADD_TASK",
      payload: task,
    });
  }

  function deleteTask(id) {
    projectsDispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  const contextValue = {
    projects: projectState.projects,
    selectedProjectId: projectState.selectedProjectId,
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
