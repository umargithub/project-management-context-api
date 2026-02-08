# Project Management App

A React-based project management application for organizing projects and tasks.

## Features

- Create and manage multiple projects
- Add tasks to each project
- Delete projects and tasks
- Track project due dates
- Clean, modern UI with Tailwind CSS

## Technologies Used

- React 19
- Context API for state management
- Tailwind CSS
- Vite

## What I Learned

- Context API for global state management
- Eliminating prop drilling with React Context
- Immutable state updates with functional updates
- Managing related state (projects and tasks)
- Conditional rendering patterns
- Component composition without prop passing
- Pure functions for state updates

## Installation
```bash
# Clone the repository
git clone https://github.com/umargithub/project-management-context-api

# Navigate to project directory
cd project-management-context-api

# Install dependencies
npm install

# Run development server
npm run dev
```

## Usage

1. Click "Add Project" to create a new project
2. Fill in project details (title, description, due date)
3. Add tasks to your project
4. Click on projects in the sidebar to view details
5. Delete projects or tasks as needed

## Project Structure
```
src/
├── components/
│   ├── Form.jsx              # Project creation form
│   ├── ProjectDetails.jsx    # Project view with tasks
│   ├── Sidebar.jsx           # Project list sidebar
│   ├── NoProject.jsx         # Empty state
│   ├── Todo.jsx              # Individual task
│   └── TodoForm.jsx          # Task creation form
├── store/
│   └── project-context.jsx   # Context API implementation
├── utils/
│   └── dateFormatter.js      # Date formatting utility
├── App.jsx                   # Main app component
└── main.jsx                  # Entry point with Provider
```

## Architecture Evolution

This project demonstrates the transition from prop drilling to Context API:

**Before:** Props passed through multiple component levels  
**After:** Components access state directly via Context

Benefits achieved:
- Cleaner component interfaces
- Better separation of concerns
- Easier to maintain and scale
- No intermediate components passing unused props

## License

MIT

---

Built while learning React Context API and state management patterns 🚀
