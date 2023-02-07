import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromTodo from './reducers/todo.reducer';


export interface TodosState {

  [fromTodo.todoFeatureKey]: fromTodo.State;
}

export const reducers: ActionReducerMap<TodosState> = {

  [fromTodo.todoFeatureKey]: fromTodo.reducer,
};


export const metaReducers: MetaReducer<TodosState>[] = isDevMode() ? [] : [];
