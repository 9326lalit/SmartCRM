import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    status: "Customer", // Default status
  });

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/customers", newCustomer);
      setCustomers([...customers, response.data]); // Update UI with new customer
      setOpen(false);
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        status: "Customer",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Customers & Leads</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-72"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">+ Add Customer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input name="name" value={newCustomer.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" value={newCustomer.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input name="phone" type="tel" value={newCustomer.phone} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input name="address" value={newCustomer.address} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input name="company" value={newCustomer.company} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Input name="status" value={newCustomer.status} onChange={handleChange} required />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* CUSTOMER TABLE */}
      <Card>
        <CardContent className="overflow-x-auto">
          <Table className="border-collapse w-full">
            <TableHeader>
              <TableRow className="bg-blue-600 text-white">
                <TableHead className="p-3">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer._id} className="hover:bg-gray-200 text-gray-800">
                  <TableCell className="p-3">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "Lead"
                          ? "warning"
                          : customer.status === "Customer"
                          ? "success"
                          : "default"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <Button size="icon" variant="ghost">
                      <FaEdit className="text-blue-500" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <FaTrash className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
