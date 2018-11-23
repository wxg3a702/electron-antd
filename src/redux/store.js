import { createStore } from 'redux';
import todoReducer from './reducers/reducer';

export default createStore(todoReducer);