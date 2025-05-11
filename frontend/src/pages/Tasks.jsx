import React, { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    console.log("Fetching tasks..."); // Debugging log
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://smartcrmbackend.onrender.com/api/tasks/gettasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Dependency array ensures this runs only once

  const handleDelete = (taskId) => {
    axios.delete(`https://smartcrmbackend.onrender.com/api/tasks/delete/${taskId}`)
      .then(() => {
        setTasks(prev => prev.filter(task => task._id !== taskId));
        alert({
          title: "Task Deleted",
          description: `Task with ID ${taskId} was successfully deleted.`,
          variant: "default",
        });
      })
      .catch(error => {
        console.error("Error deleting task:", error);
        alert({
          title: "Error",
          description: "Could not delete task.",
          variant: "destructive",
        });
      });
  };

  const handleAddTask = () => {
    axios.post("https://smartcrmbackend.onrender.com/api/tasks/assigntask", newTask) // Replace with your API
      .then(response => {
        setTasks([...tasks, response.data]);
        setIsModalOpen(false);
        setNewTask({ title: "", description: "", assignedTo: "", dueDate: "" });
      })
      .catch(error => console.error("Error adding task:", error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📌 Task Manager</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
        + Assign Task
      </button>

      {/* Task List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">{task.title}</h2>
              <p className="text-gray-600 mt-1">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">👤 Assigned to: {task.assignedTo.name} ({task.assignedTo.email})</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-full uppercase">
                {task.status}
              </span>
              <span className="text-gray-500 text-sm">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <button 
              onClick={() => handleDelete(task._id)} 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
            <input 
              type="text" 
              placeholder="Title" 
              className="w-full border p-2 mb-3 rounded" 
              value={newTask.title} 
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea 
              placeholder="Description" 
              className="w-full border p-2 mb-3 rounded" 
              value={newTask.description} 
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Assigned To (email)" 
              className="w-full border p-2 mb-3 rounded" 
              value={newTask.assignedTo} 
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            />
            <input 
              type="date" 
              className="w-full border p-2 mb-3 rounded" 
              value={newTask.dueDate} 
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2">
                Cancel
              </button>
              <button 
                onClick={handleAddTask} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
