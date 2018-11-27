import { 
  ADD_TODO,
  CURRENT_PROJECT
} from '../actions/actionTypes';

const initialState = {
  todos: [],
  currentProject: {},
};

const addTodo = (state, action) => {
  return { ...state, todos: state.todos.concat(action.todo) }
}

const updateCurrentProject = (state, payload) => {
  return { ...state, currentProject: payload.currentProject}
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: return addTodo(state, action);
    case CURRENT_PROJECT: return updateCurrentProject(state, action);
    default: return state;
  }
};

export default todoReducer;