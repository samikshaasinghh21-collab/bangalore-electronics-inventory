import React, { useState } from "react";
import { useInvoices } from "../../../context/InvoiceContext";

const InvoicePage = () => {
  const { invoices } = useInvoices();
  const [search, setSearch] = useState("");
  const [openInvoice, setOpenInvoice] = useState(null);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.project.toLowerCase().includes(search.toLowerCase()) ||
      inv.items.some((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  const printInvoice = () => window.print();

  return (
    <div className="p-6 bg-gray-100 min-h-screen print:bg-white">
      {/* Header */}
      <div className="mb-6 print:hidden">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-gray-600">
          Billing, GST breakup & project-wise invoices
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Invoice / Project / Item..."
        className="border p-3 mb-6 w-full rounded-lg shadow-sm print:hidden"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Empty */}
      {filteredInvoices.length === 0 && (
        <div className="bg-white p-8 rounded shadow text-center text-gray-500">
          No invoices found
        </div>
      )}

      {/* Invoices */}
      <div className="space-y-5">
        {filteredInvoices.map((inv) => {
          const subtotal = inv.items.reduce(
            (sum, i) => sum + i.qty * i.rate,
            0
          );
          const cgst = subtotal * 0.09;
          const sgst = subtotal * 0.09;

          return (
            <div
              key={inv.invoiceNo}
              className="bg-white rounded-xl shadow"
            >
              {/* Header */}
              <div
                className="p-5 flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setOpenInvoice(
                    openInvoice === inv.invoiceNo ? null : inv.invoiceNo
                  )
                }
              >
                <div>
                  <p className="text-lg font-semibold">{inv.invoiceNo}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(inv.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    Project: {inv.project}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">
                    ₹{inv.grandTotal.toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
                      inv.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              {openInvoice === inv.invoiceNo && (
                <div className="border-t px-5 pb-5">
                  <table className="w-full text-sm mt-4">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Item</th>
                        <th className="p-2 text-right">Qty</th>
                        <th className="p-2 text-right">Rate</th>
                        <th className="p-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inv.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2 text-right">{item.qty}</td>
                          <td className="p-2 text-right">
                            ₹{item.rate.toLocaleString("en-IN")}
                          </td>
                          <td className="p-2 text-right font-medium">
                            ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* GST */}
                  <div className="mt-4 text-right space-y-1">
                    <p>Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
                    <p>CGST (9%): ₹{cgst.toLocaleString("en-IN")}</p>
                    <p>SGST (9%): ₹{sgst.toLocaleString("en-IN")}</p>
                    <p className="text-lg font-bold">
                      Grand Total: ₹{inv.grandTotal.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-end gap-3 print:hidden">
                    <button
                      onClick={printInvoice}
                      className="px-4 py-2 border rounded"
                    >
                      Print
                    </button>
                    <button
                      onClick={printInvoice}
                      className="px-4 py-2 bg-indigo-600 text-white rounded"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvoicePage;
