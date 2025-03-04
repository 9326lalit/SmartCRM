


import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const BillingPage = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    address: "",
    gstin: "",
    contact: "",
    email: "",
    buyerName: "",
    buyerAddress: "",
    buyerGstin: "",
    invoiceNo: "",
    invoiceDate: "",
    deliveryMode: "",
    description: "",
    hsn: "",
    quantity: "",
    rate: "",
    amount: "",
    cgst: "",
    sgst: "",
  });

  useEffect(() => {
    // const savedData = localStorage.getItem("invoiceData");
    // if (savedData) setInvoiceData(JSON.parse(savedData));
  }, []);

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    alert("Invoice data saved!");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Tax Invoice", 14, 10);
    
    doc.autoTable({
      startY: 20,
      head: [["Field", "Details"]],
      body: [
        ["Company Name", invoiceData.companyName],
        ["Address", invoiceData.address],
        ["GSTIN", invoiceData.gstin],
        ["Contact", invoiceData.contact],
        ["Email", invoiceData.email],
        ["Buyer Name", invoiceData.buyerName],
        ["Buyer GSTIN", invoiceData.buyerGstin],
        ["Invoice No", invoiceData.invoiceNo],
        ["Invoice Date", invoiceData.invoiceDate],
        ["Delivery Mode", invoiceData.deliveryMode],
        ["Product", invoiceData.description],
        ["HSN Code", invoiceData.hsn],
        ["Quantity", invoiceData.quantity],
        ["Rate", `₹ ${invoiceData.rate}`],
        ["Amount", `₹ ${invoiceData.amount}`],
        ["CGST", `${invoiceData.cgst}%`],
        ["SGST", `${invoiceData.sgst}%`],
      ],
    });

    doc.save("Invoice.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <input className="p-2 border rounded" name="companyName" value={invoiceData.companyName} onChange={handleChange} placeholder="Company Name" />
        <input className="p-2 border rounded" name="gstin" value={invoiceData.gstin} onChange={handleChange} placeholder="GSTIN" />
        <input className="p-2 border rounded" name="buyerName" value={invoiceData.buyerName} onChange={handleChange} placeholder="Buyer Name" />
        <input className="p-2 border rounded" name="buyerGstin" value={invoiceData.buyerGstin} onChange={handleChange} placeholder="Buyer GSTIN" />
        <input className="p-2 border rounded" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleChange} placeholder="Invoice No" />
        <input className="p-2 border rounded" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} placeholder="Invoice Date" />
        <input className="p-2 border rounded" name="description" value={invoiceData.description} onChange={handleChange} placeholder="Product Description" />
        <input className="p-2 border rounded" name="hsn" value={invoiceData.hsn} onChange={handleChange} placeholder="HSN Code" />
        <input className="p-2 border rounded" name="quantity" value={invoiceData.quantity} onChange={handleChange} type="number" placeholder="Quantity" />
        <input className="p-2 border rounded" name="rate" value={invoiceData.rate} onChange={handleChange} type="number" placeholder="Rate" />
        <input className="p-2 border rounded" name="amount" value={invoiceData.amount} onChange={handleChange} type="number" placeholder="Amount" />
        <input className="p-2 border rounded" name="cgst" value={invoiceData.cgst} onChange={handleChange} type="number" placeholder="CGST (%)" />
        <input className="p-2 border rounded" name="sgst" value={invoiceData.sgst} onChange={handleChange} type="number" placeholder="SGST (%)" />
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button onClick={generatePDF} className="bg-green-500 text-white px-4 py-2 rounded">Download PDF</button>
      </div>
    </div>
  );
};

export default BillingPage;
