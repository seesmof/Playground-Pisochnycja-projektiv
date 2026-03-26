"use client";

import { useState } from "react";

interface Todo {
  isDone: boolean;
  message: string;
}
const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return "Jesus is KING";
};
export default Home;
