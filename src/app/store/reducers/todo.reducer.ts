import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';
import { translateTodos, undoTranslateTodos } from '../actions/todo.actions';


export const todoFeatureKey = 'todos';

export interface State {
  todos: Todo[]
}

export const initialState: State = {
  todos: []
};

export const reducer = createReducer(
  initialState,
  on(translateTodos, (state, action)=>{
    var newState: State = JSON.parse(JSON.stringify(state));
    newState.todos = action.todos;


    return newState;
  }),
  on(undoTranslateTodos, (state, action)=>{
    var newState: State = JSON.parse(JSON.stringify(state));
    newState.todos = [];
    return newState;
  })

);
