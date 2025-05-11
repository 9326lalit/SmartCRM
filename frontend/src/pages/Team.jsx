import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Trash2, Edit3, Save, Filter, Moon, Sun } from "lucide-react";

const API_URL = "https://smartcrmbackend.onrender.com/api/team"; // Update this with your backend URL

const Team = () => {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", joinDate: "", paymentStatus: "Unpaid", tasksCompleted: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editedMember, setEditedMember] = useState({});
  const [filterPayment, setFilterPayment] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch team members from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTeam(response.data))
      .catch(error => console.error("Error fetching team:", error));
  }, []);

  // Add a new member
  const addMember = () => {
    if (!newMember.name || !newMember.role || !newMember.joinDate) return;
    
    axios.post(API_URL, newMember)
      .then(response => {
        setTeam([...team, response.data]); // Add new member to state
        setNewMember({ name: "", role: "", joinDate: "", paymentStatus: "Unpaid", tasksCompleted: 0 });
      })
      .catch(error => console.error("Error adding member:", error));
  };

  // Delete a member
  const removeMember = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTeam(team.filter(member => member.id !== id)))
      .catch(error => console.error("Error deleting member:", error));
  };

  // Start editing a member
  const startEditing = (member) => {
    setEditingId(member.id);
    setEditedMember({ ...member });
  };

  // Save edited member
  const saveEdit = () => {
    axios.put(`${API_URL}/${editingId}`, editedMember)
      .then(response => {
        setTeam(team.map(member => (member.id === editingId ? response.data : member)));
        setEditingId(null);
      })
      .catch(error => console.error("Error updating member:", error));
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Filter and sort team list
  const sortedFilteredTeam = team
    .filter(member => (filterPayment ? member.paymentStatus === filterPayment : true))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      if (sortBy === "joinDate") return new Date(a.joinDate) - new Date(b.joinDate);
      return 0;
    });

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">👥 Team Management</h2>
          <button onClick={toggleDarkMode} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Add Member */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input type="text" placeholder="Name" value={newMember.name} 
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="border px-3 py-2 rounded-md w-full sm:w-auto" />
          <input type="text" placeholder="Role" value={newMember.role} 
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="border px-3 py-2 rounded-md w-full sm:w-auto" />
          <input type="date" value={newMember.joinDate} 
            onChange={(e) => setNewMember({ ...newMember, joinDate: e.target.value })}
            className="border px-3 py-2 rounded-md w-full sm:w-auto" />
          <button onClick={addMember} className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600">
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Filters & Sorting */}
        <div className="flex justify-between mb-4">
          <select onChange={(e) => setFilterPayment(e.target.value)} className="border px-3 py-2 rounded-md">
            <option value="">Filter by Payment</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <select onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-2 rounded-md">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="role">Role</option>
            <option value="joinDate">Join Date</option>
          </select>
        </div>

        {/* Team List */}
        <ul>
          {sortedFilteredTeam.map(member => (
            <li key={member.id} className="flex justify-between items-center p-3 border-b bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm mb-2">
              {editingId === member.id ? (
                <div className="flex flex-wrap gap-2">
                  <input type="text" value={editedMember.name} onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })} className="border px-2 py-1 rounded-md" />
                  <input type="text" value={editedMember.role} onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })} className="border px-2 py-1 rounded-md" />
                  <input type="date" value={editedMember.joinDate} onChange={(e) => setEditedMember({ ...editedMember, joinDate: e.target.value })} className="border px-2 py-1 rounded-md" />
                  <button onClick={saveEdit} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    <Save size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                  <span><strong>{member.name}</strong> - {member.role}</span>
                  <span>📅 {member.joinDate} | 💰 {member.paymentStatus} | ✅ {member.tasksCompleted} Tasks</span>
                </div>
              )}
              <div className="flex gap-2">
                {editingId !== member.id && (
                  <button onClick={() => startEditing(member)} className="text-blue-500 hover:text-blue-600">
                    <Edit3 size={18} />
                  </button>
                )}
                <button onClick={() => removeMember(member.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;
