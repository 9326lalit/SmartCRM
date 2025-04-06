import { useEffect, useState, useRef } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import CRMLineChart from "../components/charts/LineChart";
import CRMPieChart from "../components/charts/PieChart";
import axios from "axios"; // Directly importing axios for API requests

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    customers: 0,
    leads: 0,
    revenue: 0,
    growth: 0,
  });
  
  const [selectedChart, setSelectedChart] = useState("line");
  const [recentActivity, setRecentActivity] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "Lead" });
  const hasFetchedData = useRef(false); // Track if data has been fetched

  // Fetch dashboard data
  useEffect(() => {
    if (hasFetchedData.current) return; // Prevent duplicate API calls
    hasFetchedData.current = true;

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats/stats");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchDashboardData();

    // Load recent activity from localStorage
    const storedActivity = JSON.parse(localStorage.getItem("recentActivity")) || [];
    setRecentActivity(storedActivity);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name) return;

    const newEntry = { activity: `${formData.name} added as ${formData.type}`, time: "Just now" };
    
    // Update state
    const updatedActivity = [newEntry, ...recentActivity];
    setRecentActivity(updatedActivity);
    
    // Store in localStorage
    localStorage.setItem("recentActivity", JSON.stringify(updatedActivity));

    // Close modal and reset form
    setIsModalOpen(false);
    setFormData({ name: "", type: "Lead" });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* KPI Cards */}
      {[ 
        { title: "Total Customers", value: dashboardData.totalCustomers, change: `+${dashboardData.totalCustomers}% from last month`, color: "text-green-600" },
        { title: "Total Leads", value: dashboardData.totalLeads, change: "new leads ", color: "text-blue-600" },
        { title: "Revenue", value: `$${dashboardData.totalRevenue}`, change: "+12% from last month", color: "text-green-600" }
      ].map((item, index) => (
        <Card key={index} className="p-4 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-3xl font-bold">{item.value}</p>
          <p className={`text-sm ${item.color}`}>{item.change}</p>
        </Card>
      ))}

      {/* Chart Section with Selector */}
      <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Data Visualization</h3>
          <select 
            className="border rounded-md px-3 py-2" 
            value={selectedChart} 
            onChange={(e) => setSelectedChart(e.target.value)}
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        <div className="flex justify-center">
          {selectedChart === "line" && <CRMLineChart />}
          {selectedChart === "pie" && <CRMPieChart />}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>{item.activity}</span>
                <span className="text-gray-500">{item.time}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="col-span-1 md:col-span-3 flex gap-4 mt-6">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(true)}>
          Add New Lead
        </Button>
        <Button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={() => { 
          setIsModalOpen(true); 
          setFormData({ ...formData, type: "Customer" });
        }}>
          Add Customer
        </Button>
      </div>

      {/* Modal for Adding Lead or Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add {formData.type}</h3>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter name" 
              className="w-full border p-2 rounded-md mb-3"
            />
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="w-full border p-2 rounded-md mb-4"
            >
              <option value="Lead">Lead</option>
              <option value="Customer">Customer</option>
            </select>
            <div className="flex justify-between">
              <Button className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;