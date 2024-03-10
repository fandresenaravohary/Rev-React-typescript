import { FC, useState } from "react";
import useTaskManager from "../hooks/useTaskManager";
import "./TaskManager.css";

export const TaskManager: FC = () => {
 const {
    tasks,
    addTask,
    completeTask,
    updateTask,
    setSearchKeyword,
 } = useTaskManager();

 const [editedTask, setEditedTask] = useState<{ id: string; title: string } | null>(null);

 return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={(ev) => setSearchKeyword(ev.target.value)}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={editedTask?.title ?? ""}
          onChange={(ev) => setEditedTask({ id: editedTask?.id ?? "", title: ev.target.value })}
          placeholder="Add new task"
        />

        <button onClick={() => addTask(editedTask?.title ?? "")}>Add Task</button>
      </div>

      <ul className="container">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                value={task.title}
                onChange={(e) => {
                 const updatedTask = {
                    id: task.id,
                    title: e.target.value,
                 };
                 updateTask(task.id, updatedTask);
                }}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
 );
};
