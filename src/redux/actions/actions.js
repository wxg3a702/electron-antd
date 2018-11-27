import { 
  ADD_TODO,
  CURRENT_PROJECT
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