import { useState } from "react";

const Invoices = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, client: "John Doe", amount: "$500", status: "Paid" },
    { id: 2, client: "Acme Corp", amount: "$1200", status: "Pending" }
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">💳 Invoices & Payments</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id} className="border">
              <td className="p-2">{invoice.client}</td>
              <td className="p-2">{invoice.amount}</td>
              <td className="p-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;




// import { useEffect, useState } from "react";
// import API from "../api/axios";

// const Invoices = () => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     API.get("/payments")
//       .then((res) => setInvoices(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handlePayment = (invoiceId) => {
//     API.post("/payments", { invoiceId })
//       .then((res) => alert("Payment successful!"))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <h2>Invoices</h2>
//       <ul>
//         {invoices.map((invoice) => (
//           <li key={invoice._id}>
//             {invoice.amount} - {invoice.status}
//             {invoice.status !== "Paid" && (
//               <button onClick={() => handlePayment(invoice._id)}>Pay Now</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Invoices;
