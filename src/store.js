import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const updateTodo = (todos, id, text) =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos, id) =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos, id) => todos.filter((todo) => todo.id !== id);

let todoStore = (set, get) => ({
  todos: [],
  newTodo: "",
  load: (todos) => {
    set((state) => ({
      ...state,
      todos,
    }));
  },
  addTodo: () => {
    const state = get();

    const newTodo = {
      id: Math.max(0, Math.max(...state.todos.map(({ id }) => id))) + 1,
      text: state.newTodo,
      done: false,
    };
    const todos = [...state.todos, newTodo];

    set((state) => ({
      ...state,
      todos,
      newTodo: "",
    }));
  },
  setNewTodo: (text) => {
    set((state) => ({
      ...state,
      newTodo: text,
    }));
  },
  update: (id, text) => {
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }));
  },
  toggle: (id) => {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }));
  },
  remove: (id) => {
    set((state) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }));
  },
});

todoStore =  devtools(todoStore)
todoStore =  persist(todoStore, {name: "todos_data"})

// zustand implementation
const useStore = create(todoStore);

export default useStore;
