import React from "react";
import ItemRow from "./ItemRow";
import jsPDF from "jspdf";

const InvoiceForm = ({ invoice, setInvoice }) => {
  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, unitRate: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = invoice.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInvoice({ ...invoice, items: updatedItems });
  };

  const deleteItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleClientChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.unitRate,
      0
    );
  };

  const calculateTax = () => {
    return (calculateSubtotal() * invoice.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 30);
    doc.text(`Date: ${invoice.date}`, 20, 40);
    doc.text(`Client: ${invoice.clientName}`, 20, 50);
    doc.text(`Address: ${invoice.clientAddress}`, 20, 60);

    let y = 80;
    doc.text("Description | Quantity | Unit Rate | Amount", 20, y);
    invoice.items.forEach((item) => {
      y += 10;
      const amount = item.quantity * item.unitRate;
      doc.text(
        `${item.description} | ${item.quantity} | $${item.unitRate} | $${amount}`,
        20,
        y
      );
    });

    y += 20;
    doc.text(`Subtotal: $${calculateSubtotal().toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Tax (${invoice.taxRate}%): $${calculateTax().toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Total: $${calculateTotal().toFixed(2)}`, 20, y);

    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="clientName"
          value={invoice.clientName}
          onChange={handleClientChange}
          placeholder="Client Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="clientAddress"
          value={invoice.clientAddress}
          onChange={handleClientChange}
          placeholder="Client Address"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="invoiceNumber"
          value={invoice.invoiceNumber}
          onChange={handleClientChange}
          placeholder="Invoice Number"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={invoice.date}
          onChange={handleClientChange}
          className="border p-2 rounded"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">Items</h3>
      {invoice.items.map((item, index) => (
        <ItemRow
          key={index}
          item={item}
          index={index}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      ))}
      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add Item
      </button>
      <div className="mt-4">
        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        <p>
          Tax ({invoice.taxRate}%): ${calculateTax().toFixed(2)}
        </p>
        <p className="font-bold">Total: ${calculateTotal().toFixed(2)}</p>
      </div>
      <button
        onClick={generatePDF}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default InvoiceForm;
