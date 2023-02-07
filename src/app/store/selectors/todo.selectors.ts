import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from '..';
import { todoFeatureKey } from '../reducers/todo.reducer';



export const selectTodos = (state: TodosState) => state.todos.todos;