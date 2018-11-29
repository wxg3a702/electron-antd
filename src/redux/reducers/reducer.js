import { 
  ADD_TODO,
  CURRENT_PROJECT,
  CURRENT_EDITOR_TABS,
  REMOVE_CURRENT_EDITOR_TAB
} from '../actions/actionTypes';

const initialState = {
  todos: [],
  currentProject: {},
  currentEditorTabs: [],
  activeEditorTab: {}
};

const addTodo = (state, action) => {
  return { ...state, todos: state.todos.concat(action.todo) }
}

const updateCurrentProject = (state, payload) => {
  return { ...state, currentProject: payload.currentProject}
}

const updateCurrentEditorTabs = (state, payload) => {
  let isExists = false;
  state.currentEditorTabs.forEach(tab => {
    if (tab.name === payload.currentEditorTab.name) {
      isExists = true;
    } 
  });
  return { ...state, 
    activeEditorTab: payload.currentEditorTab,
    currentEditorTabs: isExists ? state.currentEditorTabs : state.currentEditorTabs.concat(payload.currentEditorTab)}
}

const removeCurrentEditorTab = (state, payload) => {
  return { ...state,  currentEditorTabs: state.currentEditorTabs.filter(tab => tab.name !== payload.editorTab)}
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: return addTodo(state, action);
    case CURRENT_PROJECT: return updateCurrentProject(state, action);
    case CURRENT_EDITOR_TABS: return updateCurrentEditorTabs(state, action);
    case REMOVE_CURRENT_EDITOR_TAB: return removeCurrentEditorTab(state, action);
    default: return state;
  }
};

export default todoReducer;