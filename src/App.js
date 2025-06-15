import React, { useState } from "react";
import InvoiceForm from "./Components/InvoiceForm";
import InvoicePreview from "./Components/InvoicePreview";
import "./index.css";

const App = () => {
  const [invoice, setInvoice] = useState({
    clientName: "",
    clientAddress: "",
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    items: [],
    taxRate: 10,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Invoice Builder</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
};

export default App;
