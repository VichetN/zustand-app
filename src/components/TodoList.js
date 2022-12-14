import * as React from "react";
import { useGeolocation } from "react-use";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import useStore from "../store";

function TodoListItems() {
  const todos = useStore((state) => state.todos);
  const update = useStore((state) => state.update);
  const toggle = useStore((state) => state.toggle);
  const remove = useStore((state) => state.remove);

  return (
    <>
      {todos?.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox isChecked={todo?.done} onChange={() => toggle(todo?.id)} />
          <Input
            mx={2}
            value={todo?.text}
            onChange={(e) => update(todo?.id, e.target.value)}
          />
          <Button onClick={() => remove(todo?.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const state = useGeolocation({
    ...options,
  });

  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}

export default TodoList;
