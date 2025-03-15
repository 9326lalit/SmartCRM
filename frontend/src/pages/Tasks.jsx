// import { useEffect, useState } from "react";
// import API from "../api/axios"; // Ensure your API instance is correctly configured
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";

// const statusColors = {
//   pending: "bg-yellow-500",
//   in_progress: "bg-blue-500",
//   completed: "bg-green-500",
// };

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [newTask, setNewTask] = useState({ title: "sdfsdf", description: "sdfsdf", assignedTo: "j453h53r4b5435b345bb", dueDate: "3/20/1020" });

//   useEffect(() => {
//     fetchTasks();
//     fetchEmployees();
//   }, []);

//   // ✅ Fetch all tasks safely
//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/tasks/gettasks");
//       setTasks(Array.isArray(res.data) ? res.data : []); // Ensure tasks is always an array
//     } catch (err) {
//       toast.error("Error fetching tasks");
//       setTasks([]); // Prevent errors when mapping over tasks
//     }
//   };

//   // ✅ Fetch employees safely
//   const fetchEmployees = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users/getemployees");
//       setEmployees(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       toast.error("Error fetching employees");
//       setEmployees([]);
//     }
//   };

//   // ✅ Handle Task Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/tasks/assigntask", newTask);
//       toast.success("Task assigned successfully!");
//       setShowModal(false);
//       setNewTask({ title: "", description: "", assignedTo: "", dueDate: "" });
//       fetchTasks(); // Refresh tasks
//     } catch (err) {
//       toast.error("Failed to assign task");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Toaster position="top-right" />
//       <div className="max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">📌 Your Tasks</h2>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(true)}>
//             + Assign Task
//           </button>
//         </div>

//         {tasks.length === 0 ? (
//           <p className="text-gray-500 text-center">No tasks available</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {tasks.map((task) => (
//               <div key={task._id} className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-gray-300">
//                 <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
//                 <p className="text-gray-600 mt-1">{task.description}</p>
//                 <p className="text-gray-500 text-sm mt-1">👤 Assigned to: {task.assignedTo?.name} ({task.assignedTo?.email})</p>
//                 <div className="flex items-center justify-between mt-4">
//                   <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColors[task.status] || "bg-gray-500"}`}>
//                     {task.status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
//                   </span>
//                   <span className="text-sm text-gray-500">🕒 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-lg font-bold mb-4">Assign a Task</h3>
//             <form onSubmit={handleSubmit}>
//               <input type="text" placeholder="Title" className="w-full p-2 border rounded mb-2" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
//               <textarea placeholder="Description" className="w-full p-2 border rounded mb-2" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required></textarea>
//               <select className="w-full p-2 border rounded mb-2" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} required>
//                 <option value="">Select Employee</option>
//                 {employees.map((emp) => (
//                   <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>
//                 ))}
//               </select>
//               <input type="date" className="w-full p-2 border rounded mb-2" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} required />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Assign Task</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tasks;


import { useEffect, useState } from "react";
import API from "../api/axios";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const statusColors = {
  pending: "bg-yellow-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", dueDate: "" });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/gettasks");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Error fetching tasks");
      setTasks([]);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/getemployees");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Error fetching employees");
      setEmployees([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks/assigntask", newTask);
      toast.success("Task assigned successfully!");
      setShowModal(false);
      setNewTask({ title: "", description: "", assignedTo: "", dueDate: "" });
      fetchTasks();
    } catch (err) {
      toast.error("Failed to assign task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/deletetask/${taskId}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📌 Your Tasks</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(true)}>
            + Assign Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-gray-300">
                <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                <p className="text-gray-500 text-sm mt-1">👤 Assigned to: {task.assignedTo?.name} ({task.assignedTo?.email})</p>
                <div className="flex items-center justify-between mt-4">
                  <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColors[task.status] || "bg-gray-500"}`}>
                    {task.status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
                  </span>
                  <span className="text-sm text-gray-500">🕒 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="mt-4 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Assign a Task</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Title" className="w-full p-2 border rounded mb-2" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
              <textarea placeholder="Description" className="w-full p-2 border rounded mb-2" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required></textarea>
              <select className="w-full p-2 border rounded mb-2" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} required>
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>
                ))}
              </select>
              <input type="date" className="w-full p-2 border rounded mb-2" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Assign Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;