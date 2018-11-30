import { 
  ADD_TODO,
  CURRENT_PROJECT,
  CURRENT_EDITOR_TABS,
  REMOVE_CURRENT_EDITOR_TAB,
  CURRENT_PROJECT_PATH
} from '../actions/actionTypes';

const initialState = {
  todos: [],
  currentProject: {},
  currentProjectPath: '',
  currentEditorTabs: [],
  activeEditorTab: {}
};

const addTodo = (state, action) => {
  return { ...state, todos: state.todos.concat(action.todo) }
}

const updateCurrentProject = (state, payload) => {
  return { ...state, currentProject: payload.currentProject}
}

const updateCurrentProjectPath = (state, payload) => {
  return { ...state, currentProjectPath: payload.currentProjectPath}
}

const updateCurrentEditorTabs = (state, payload) => {
  let isExists = false;
  state.currentEditorTabs.forEach(tab => {
    if (tab.name === payload.currentEditorTab.name) {
      isExists = true;
    } 
  });
  return { 
    ...state, 
    activeEditorTab: payload.currentEditorTab,
    currentEditorTabs: isExists ? state.currentEditorTabs : state.currentEditorTabs.concat(payload.currentEditorTab)}
}

const removeCurrentEditorTab = (state, payload) => {
  let tempIndex = 0;
  const tempTabs = state.currentEditorTabs.filter((tab, index) => {
    if (tab.name !== payload.editorTab) {
      return tab;
    } else {
      if (index !== 0) {
        tempIndex = index - 1;
      }
    }
  })
  const tempCurrentTap = tempTabs[tempIndex];
  return { 
    ...state,  
    activeEditorTab: tempCurrentTap,
    currentEditorTabs: tempTabs
  }
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: return addTodo(state, action);
    case CURRENT_PROJECT: return updateCurrentProject(state, action);
    case CURRENT_PROJECT_PATH: return updateCurrentProjectPath(state, action);
    case CURRENT_EDITOR_TABS: return updateCurrentEditorTabs(state, action);
    case REMOVE_CURRENT_EDITOR_TAB: return removeCurrentEditorTab(state, action);
    default: return state;
  }
};

export default todoReducer;