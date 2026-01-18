# Project Management App - useReducer Refactor

A React-based project management application refactored to use `useReducer` for state management instead of multiple `useState` hooks.

## What Changed

This branch refactors the state management from `useState` to `useReducer`, combining related state into a single reducer for better state coordination.

### Before (useState)

```javascript
const [projects, setProjects] = useState([]);
const [selectedProjectId, setSelectedProjectId] = useState(undefined);

function addProject(project) {
  const newProject = { id: crypto.randomUUID(), ...project };
  setProjects((prev) => [newProject, ...prev]);
  setSelectedProjectId(newProject.id); // Two separate updates
}
```

### After (useReducer)

```javascript
const [projectState, dispatch] = useReducer(projectsReducer, {
  projects: [],
  selectedProjectId: undefined,
});

function addProject(project) {
  dispatch({ type: "ADD_PROJECT", payload: project }); // Single atomic update
}
```

## Why Combine Both States?

`projects` and `selectedProjectId` are **tightly coupled** - they frequently update together and represent the same domain (project management):

- When adding a project → update both `projects` array and `selectedProjectId`
- When deleting a project → remove from `projects` and conditionally clear `selectedProjectId`
- They're conceptually related (can't select a project that doesn't exist)

Combining them ensures:

- ✅ **Atomic updates** - both values change together in one dispatch
- ✅ **Consistent state** - impossible to have mismatched project/selection state
- ✅ **Centralized logic** - all project state transitions in one reducer

## Alternative Pattern (Separate States with Reducer)

If we wanted to use `useReducer` but keep states separate:

```javascript
const [projects, projectsDispatch] = useReducer(projectsReducer, []);
const [selectedProjectId, setSelectedProjectId] = useState(undefined);

function addProject(project) {
  const newId = crypto.randomUUID();

  projectsDispatch({
    type: "ADD_PROJECT",
    payload: { ...project, id: newId },
  });

  setSelectedProjectId(newId); // Still two updates
}
```

**This works but:**

- Loses the benefit of atomic updates
- ID generation happens outside reducer (less predictable)
- Misses the main advantage of `useReducer` for coordinated state

## Was This Refactor Necessary?

**Honestly? No.**

The original `useState` implementation was clean and perfectly suitable for this app's complexity. This refactor was done **purely for learning purposes** to:

- Practice `useReducer` patterns
- Understand when to combine vs separate state
- Build muscle memory for action-based state management
- Prepare for more complex state scenarios in larger apps

**When `useReducer` actually makes sense:**

- 10+ actions with complex interdependencies
- State transitions require validation or side effects
- Multiple related state values update together frequently
- Need for time-travel debugging or undo/redo

**For this project:** `useState` would be my choice in production. But learning `useReducer` now prepares you for Redux and larger applications where this pattern becomes essential.

## Reducer Actions

- `SELECT_PROJECT` - Set the selected project ID
- `ADD_NEW_PROJECT` - Clear selection (new project form)
- `ADD_PROJECT` - Add project and select it
- `CANCEL_PROJECT` - Clear selection (cancel form)
- `DELETE_PROJECT` - Remove project and clear selection if deleted
- `ADD_TASK` - Add task to selected project
- `DELETE_TASK` - Remove task from selected project

## Key Learnings

1. **Combine related state** - If two pieces of state frequently update together, put them in one reducer
2. **Keep unrelated state separate** - Don't merge everything just because you have multiple states
3. **useReducer isn't always better** - Use it when state logic is complex, not just because you can
4. **One reducer = one domain** - Group by logical relationship, not quantity of state

## Running the App

```bash
npm install
npm run dev
```
