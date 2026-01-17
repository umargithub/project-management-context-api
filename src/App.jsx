import "./App.css";
import Form from "./components/Form";
import ProjectDetails from "./components/ProjectDetails";
import Sidebar from "./components/Sidebar";
import NoProject from "./components/NoProject";
import { useContext } from "react";
import { ProjectContext } from "./store/project-context";

function App() {
  const { selectedProjectId } = useContext(ProjectContext);
  let content;
  if (selectedProjectId === null) {
    content = <Form />;
  } else if (selectedProjectId === undefined) {
    content = <NoProject />;
  } else {
    content = <ProjectDetails />;
  }

  return (
    <div className="flex min-h-screen bg-white-900">
      <Sidebar />

      {content}
    </div>
  );
}

export default App;
