import { Home, Users, Briefcase, Settings, Ticket, BarChart3, CheckSquare, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Smart-CRM</h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <Home size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/billing" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <BarChart3 size={20} /> Billing
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <Users size={20} /> Customers
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/leads" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <Briefcase size={20} /> Leads
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <CheckSquare size={20} /> Tasks & Reminders
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/invoices" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <FileText size={20} /> Invoices & Payments
            </NavLink>
          </li>  */}
          {/* <li>
            <NavLink to="/team" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              Team Management
            </NavLink>
          </li>  */}
          <li>
            <NavLink to="/support" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <Ticket size={20} /> Support & Tickets
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/analytics" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <BarChart3 size={20} /> Analytics & Reports
            </NavLink>
          </li> 
          <li>
            <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}>
              <Settings size={20} /> Setting
            </NavLink>
          </li> */}
        </ul>
      </nav>
      
      <hr className="border-gray-700 my-4" />

      {/* Styled Name Section */}
      <div className="text-center mt-auto">
        <p className="text-lg font-semibold opacity-80">#Developers</p>
      </div>
    </aside>
  );
};

export default Sidebar;
