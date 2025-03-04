// import { useState } from "react";

// const Team = () => {
//   const [team, setTeam] = useState([
//     { id: 1, name: "Alice Johnson", role: "Sales Manager" },
//     { id: 2, name: "Bob Smith", role: "Support Lead" }
//   ]);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">👥 Team Management</h2>
//       <ul>
//         {team.map(member => (
//           <li key={member.id} className="flex justify-between items-center p-2 border-b">
//             <span>{member.name} - {member.role}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Team;


import { useState } from "react";
import { PlusCircle, Trash2, Edit3, Save, Filter, Moon, Sun } from "lucide-react";

const Team = () => {
  const [team, setTeam] = useState([
    { id: 1, name: "Alice Johnson", role: "Sales Manager", joinDate: "2023-05-10", paymentStatus: "Paid", tasksCompleted: 20 },
    { id: 2, name: "Bob Smith", role: "Support Lead", joinDate: "2022-11-18", paymentStatus: "Unpaid", tasksCompleted: 15 }
  ]);

  const [newMember, setNewMember] = useState({ name: "", role: "", joinDate: "", paymentStatus: "Unpaid", tasksCompleted: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editedMember, setEditedMember] = useState({});
  const [filterPayment, setFilterPayment] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addMember = () => {
    if (newMember.name && newMember.role && newMember.joinDate) {
      setTeam([...team, { id: Date.now(), ...newMember }]);
      setNewMember({ name: "", role: "", joinDate: "", paymentStatus: "Unpaid", tasksCompleted: 0 });
    }
  };

  const removeMember = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  const startEditing = (member) => {
    setEditingId(member.id);
    setEditedMember({ ...member });
  };

  const saveEdit = () => {
    setTeam(team.map(member => (member.id === editingId ? editedMember : member)));
    setEditingId(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
