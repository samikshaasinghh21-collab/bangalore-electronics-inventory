import React, { useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useInvoice } from "../../../context/InvoiceContext";
import { generateInvoiceNumber } from "../../../utils/invoiceNumber";
import { COMPANY } from "../../../config/companyConfig";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const { cart, lockCart, deductStock } = useCart();
  const { addInvoice } = useInvoice();
  const navigate = useNavigate();

  const invoiceNo = generateInvoiceNumber();

  const subtotal = cart.reduce(
    (sum, i) => sum + i.qty * i.rate,
    0
  );
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  useEffect(() => {
    addInvoice({
      invoiceNo,
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      gst,
      grandTotal,
    });
  }, []);

  const handlePrint = () => {
    lockCart();
    deductStock();
    window.print();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow">

        {/* COMPANY */}
        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p>Invoice No: {invoiceNo}</p>
            <p>Date: {new Date().toLocaleDateString("en-IN")}</p>
          </div>
          <div className="text-right">
            <h2 className="font-semibold">{COMPANY.name}</h2>
            <p>{COMPANY.address}</p>
            <p>GSTIN: {COMPANY.gstin}</p>
            <p>{COMPANY.phone}</p>
          </div>
        </div>

        {/* ITEMS */}
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b">
              <th align="left">Item</th>
              <th align="right">Qty</th>
              <th align="right">Rate</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td align="right">{item.qty}</td>
                <td align="right">₹{item.rate}</td>
                <td align="right">₹{item.qty * item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="text-right">
          <p>Subtotal: ₹{subtotal}</p>
          <p>GST (18%): ₹{gst}</p>
          <p className="font-bold text-lg">
            Grand Total: ₹{grandTotal}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-between print:hidden">
          <button
            onClick={() => navigate("/billing")}
            className="border px-4 py-2 rounded"
          >
            Back to Billing
          </button>

          <button
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Print / Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
