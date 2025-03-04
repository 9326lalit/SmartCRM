// import { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// // import { useTable } from "@tanstack/react-table";
// import CRMLineChart from "../components/charts/LineChart";
// import CRMPieChart from "../components/charts/PieChart";

// const Leads = () => {
//   const [leads, setLeads] = useState([
//     { name: "John Doe", email: "john@example.com", status: "Lead" },
//     { name: "Jane Smith", email: "jane@example.com", status: "Client" },
//     { name: "Mark Brown", email: "mark@example.com", status: "Lead" },
//   ]);

//   const [search, setSearch] = useState("");
//   const [newLead, setNewLead] = useState({ name: "", email: "" });

//   const filteredLeads = leads.filter((lead) =>
//     lead.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAddLead = () => {
//     setLeads([...leads, { ...newLead, status: "Lead" }]);
//     setNewLead({ name: "", email: "" });
//   };

//   const columns = [
//     { header: "Name", accessorKey: "name" },
//     { header: "Email", accessorKey: "email" },
//     { header: "Status", accessorKey: "status" },
//   ];

//   return (
//     <div className="p-6">
//       {/* Title & Add Lead Button */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Leads</h2>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Lead</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <h2 className="text-lg font-semibold mb-2">Add New Lead</h2>
//             <Input placeholder="Name" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} />
//             <Input placeholder="Email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} />
//             <Button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleAddLead}>
//               Save
//             </Button>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Search Bar */}
//       <Input
//         className="mb-4"
//         placeholder="Search Leads..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Leads Table */}
//       <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               {columns.map((column) => (
//                 <th key={column.accessorKey} className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">
//                   {column.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLeads.map((row, i) => (
//               <tr key={i} className="border">
//                 <td className="p-2">{row.name}</td>
//                 <td className="p-2">{row.email}</td>
//                 <td className="p-2">{row.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
//         <CRMLineChart />
//         <CRMLineChart />
//         <CRMPieChart />
//       </div>
//     </div>
//   );
// };

// export default Leads;



import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CRMLineChart from "../components/charts/LineChart";
import CRMPieChart from "../components/charts/PieChart";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

const Leads = () => {
  const [leads, setLeads] = useState([
    { name: "John Doe", email: "john@example.com", status: "Lead", joined: "2024-02-10", payment: "Pending" },
    { name: "Jane Smith", email: "jane@example.com", status: "Client", joined: "2024-01-15", payment: "Completed" },
    { name: "Mark Brown", email: "mark@example.com", status: "Lead", joined: "2024-02-05", payment: "Pending" },
  ]);

  const [search, setSearch] = useState("");
  const [newLead, setNewLead] = useState({ name: "", email: "" });

  const filteredLeads = leads.filter((lead) => lead.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddLead = () => {
    setLeads([...leads, { ...newLead, status: "Lead", joined: new Date().toISOString().split("T")[0], payment: "Pending" }]);
    setNewLead({ name: "", email: "" });
  };

  const handleStatusChange = (index, newStatus) => {
    setLeads((prevLeads) => prevLeads.map((lead, i) => (i === index ? { ...lead, status: newStatus } : lead)));
  };

  const handleDeleteLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Title & Add Lead Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leads</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Lead</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-lg font-semibold mb-2">Add New Lead</h2>
            <Input placeholder="Name" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} />
            <Input placeholder="Email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} />
            <Button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleAddLead}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Input className="mb-4" placeholder="Search Leads..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Leads Table */}
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Name</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Email</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Joined</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Payment</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Status</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, i) => (
              <tr key={i} className="border">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.joined}</td>
                <td className="p-2">{lead.payment}</td>
                <td className="p-2">
                  <Select value={lead.status} onValueChange={(value) => handleStatusChange(i, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue>{lead.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleDeleteLead(i)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
        <CRMLineChart />
        <CRMLineChart />
        <CRMPieChart />
      </div>
    </div>
  );
};

export default Leads;
