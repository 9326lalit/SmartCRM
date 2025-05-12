import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Edit, Trash2, X, Search } from "lucide-react";
import { Button } from "../../components/ui/button";

const employees = [
  { name: "Lalit", email: "lalit@gmail.com" },
  { name: "Nilesh", email: "nilesh@gmail.com" },
  { name: "Divyani", email: "divyani@gmail.com" },
];

const SupportTickets = () => {
  const [tickets, setTickets] = useState(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTicket, setCurrentTicket] = useState({ title: "", description: "", assignedTo: employees[0].name, status: "Open", priority: "Medium" });

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const handleInputChange = (e) => {
    setCurrentTicket({ ...currentTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editMode) {
      setTickets(tickets.map(ticket => ticket.id === currentTicket.id ? currentTicket : ticket));
    } else {
      const newTicket = { ...currentTicket, id: Date.now() };
      setTickets([...tickets, newTicket]);
    }
    closeModal();
  };

  const openModal = (ticket = { title: "", description: "", assignedTo: employees[0].name, status: "Open", priority: "Medium" }) => {
    setCurrentTicket(ticket);
    setEditMode(!!ticket.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  const filteredTickets = tickets.filter(ticket => 
    (filterStatus === "" || ticket.status === filterStatus) &&
    (searchQuery === "" || ticket.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Support & Tickets</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Search size={20} />
          <input type="text" placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <Button onClick={() => openModal()}><PlusCircle size={20} /> Create Ticket</Button>
      </div>
      {filteredTickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="p-4 bg-white shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p className="text-sm text-gray-600">Assigned to: {ticket.assignedTo} | Status: {ticket.status} | Priority: {ticket.priority}</p>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => openModal(ticket)} className="bg-blue-500 text-white">Edit</Button>
                <Button onClick={() => deleteTicket(ticket.id)} className="bg-red-500 text-white">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-80">
            <h3>{editMode ? "Edit Ticket" : "Create Ticket"}</h3>
            <input name="title" value={currentTicket.title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 mb-2 border rounded" />
            <textarea name="description" value={currentTicket.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 mb-2 border rounded"></textarea>
            <select name="assignedTo" value={currentTicket.assignedTo} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded">
              {employees.map((emp, index) => (
                <option key={index} value={emp.name}>{emp.name}</option>
              ))}
            </select>
            <Button onClick={handleSubmit} className="w-full bg-green-500 text-white">{editMode ? "Update" : "Create"}</Button>
            <Button onClick={closeModal} className="w-full mt-2 bg-gray-300">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;