import { useState } from "react";
import { nanoid } from "nanoid";

// Définition de l'interface pour une tâche
interface Task {
    id: string;
    title: string;
}

function useTaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const addTask = (title: string) => {
        if (title.length < 1) {
            return;
        }

        const newTask: Task = {
            id: nanoid(),
            title,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const completeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: Task) => {
        setTasks(tasks.map((task) => (task.id === id ? taskUpdate : task)));
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return {
        tasks: filteredTasks,
        addTask,
        completeTask,
        updateTask,
        setSearchKeyword,
    };
}

export default useTaskManager;