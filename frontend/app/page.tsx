"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

const BACKEND_URL = "http://127.0.0.1:8000";

type Task = {
  id: number;
  content: string;
  is_completed: boolean;
};

export default function Page() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) {
      console.log("Didnt pass");
      return;
    }

    console.log("Passed the check");
    try {
      const response = await fetch(`${BACKEND_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, is_completed: false }),
      });
      const data = await response.json();
      setOutput(`Successfully created an object: ${data.content}`);
      console.log(`Successfully created an object: ${data.content}`);
    } catch (error) {
      setOutput("Failed to connect to FastAPI backend.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${BACKEND_URL}/tasks`, {
        method: "GET",
      });
      const data: Task[] = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const toggleStatus = async (task: Task) => {
    const response = await fetch(`${BACKEND_URL}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: !task.is_completed }),
    });
    const updatedTask = await response.json();

    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center p-24">
      <div className="bg-white rounded-md p-4">
        <form onSubmit={handleSubmit} className="flex gap-1">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit">Add</Button>
        </form>
        <div className="pt-12">
          {tasks.map((task) => (
            <div className="flex gap-1" key={task.id}>
              <input
                id={`task_${task.id}`}
                type="checkbox"
                checked={task.is_completed}
                onChange={() => toggleStatus(task)}
              />
              <label htmlFor={`task_${task.id}`}>
                {task.id}. {task.content}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
