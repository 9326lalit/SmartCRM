

import { useEffect, useState } from "react";
import API from "../api/axios";

const statusColors = {
  pending: "bg-yellow-500",
  completed: "bg-green-500",
  in_progress: "bg-blue-500",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks/gettasks")
      .then((res) => {
        if (res.data.get) {
          setTasks(res.data.get);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📌 Your Tasks</h2>
        
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-gray-300">
                <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColors[task.status] || "bg-gray-500"}`}>
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    🕒 {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
