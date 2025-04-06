


import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Mail, User, Clock, Trash2 } from "lucide-react";

const employees = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Michael Brown", email: "michael@example.com" },
];

const SupportTickets = () => {
  const [tickets, setTickets] = useState(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      title: "New Support Request",
      assignedTo: "",
      email: "",
      status: "Open",
    };
    setTickets([...tickets, newTicket]);
  };

  const updateAssignedTo = (id, name) => {
    const email = employees.find(emp => emp.name === name)?.email || "";
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, assignedTo: name, email } : ticket
    ));
    
    if (email) {
      sendEmailNotification(email, name);
    }
  };

  const updateStatus = (id, status) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status } : ticket
    ));
  };

  const sendEmailNotification = async (email, name) => {
    try {
      await axios.post("https://smartcrmbackend.onrender.com/send-email", { email, name });
      alert(`Email sent to ${name} (${email})`);
    } catch (error) {
      console.error("Email sending failed", error);
    }
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">🎟 Support Tickets</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
            onClick={addTicket}
          >
            <PlusCircle size={20} /> Create Ticket
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {tickets.length === 0 ? (
            <p className="text-center text-gray-500">No tickets created yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm">
                  <th className="p-3 text-left">Ticket</th>
                  <th className="p-3 text-left">Assigned To</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t hover:bg-gray-100 transition">
                    <td className="p-3 flex items-center gap-2">
                      <Mail size={18} className="text-blue-500" /> {ticket.title}
                    </td>
                    <td className="p-3">
                      <select
                        className="border p-2 rounded-md w-full focus:ring focus:ring-blue-200"
                        value={ticket.assignedTo}
                        onChange={(e) => updateAssignedTo(ticket.id, e.target.value)}
                      >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                          <option key={emp.email} value={emp.name}>{emp.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
                        value={ticket.status}
                        onChange={(e) => updateStatus(ticket.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;

