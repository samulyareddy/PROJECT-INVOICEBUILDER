import React from "react";

const InvoicePreview = ({ invoice }) => {
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

  return (
    <div className="border p-6 rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>
      <div className="mb-4">
        <p>
          <strong>Invoice Number:</strong> {invoice.invoiceNumber}
        </p>
        <p>
          <strong>Date:</strong> {invoice.date}
        </p>
        <p>
          <strong>Client:</strong> {invoice.clientName}
        </p>
        <p>
          <strong>Address:</strong> {invoice.clientAddress}
        </p>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Rate</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.unitRate.toFixed(2)}</td>
              <td className="border p-2">
                ${(item.quantity * item.unitRate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        <p>
          Tax ({invoice.taxRate}%): ${calculateTax().toFixed(2)}
        </p>
        <p className="font-bold">Total: ${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
