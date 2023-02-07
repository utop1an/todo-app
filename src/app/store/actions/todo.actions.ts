import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo';


export const translateTodos = createAction(
  '[Todo] translate Todos',
  props<{todos: Todo[]}>()
);

export const undoTranslateTodos = createAction(
  '[Todo] undo translate Todos'
)




