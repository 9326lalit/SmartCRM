



import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const Customers = () => {
  const [customers] = useState([
    {
      _id: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "ABC Ltd.",
      rawMaterial: "Cotton",
      purchaseDate: "2024-02-15",
      agent: "Michael Smith",
      paymentStatus: "Paid",
      totalAmount: 1200.50,
      quantity: "500kg",
      deliveryStatus: "Delivered",
    },
    {
      _id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      company: "XYZ Pvt. Ltd.",
      rawMaterial: "Silk",
      purchaseDate: "2024-02-10",
      agent: "Sarah Johnson",
      paymentStatus: "Pending",
      totalAmount: 850.75,
      quantity: "300kg",
      deliveryStatus: "Pending",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Customers & Transactions</h2>
      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Raw Material</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delivery Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id} className="hover:bg-gray-100 text-gray-700">
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>{customer.rawMaterial}</TableCell>
                  <TableCell>{new Date(customer.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>{customer.agent}</TableCell>
                  <TableCell>
                    <Badge variant={customer.paymentStatus === "Paid" ? "success" : "destructive"}>
                      {customer.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${customer.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{customer.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={customer.deliveryStatus === "Delivered" ? "success" : "warning"}>
                      {customer.deliveryStatus}
                    </Badge>
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
