import { 
  ADD_TODO,
  CURRENT_PROJECT,
  CURRENT_EDITOR_TABS,
  REMOVE_CURRENT_EDITOR_TAB,
  CURRENT_PROJECT_PATH
} from './actionTypes';


export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo: todo
  };
};

export const updateCurrentProject = (currentProject) => {
  return {
    type: CURRENT_PROJECT,
    currentProject
  }
}

export const updateCurrentProjectPath = (currentProjectPath) => {
  return {
    type: CURRENT_PROJECT_PATH,
    currentProjectPath
  }
}

export const updateCurrentEditorTabs = (currentEditorTab) => {
  return {
    type: CURRENT_EDITOR_TABS,
    currentEditorTab
  }
}

export const removeCurrentEditorTab = (editorTab) => {
  return {
    type: REMOVE_CURRENT_EDITOR_TAB,
    editorTab
  }
}