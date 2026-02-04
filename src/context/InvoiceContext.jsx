import React, { createContext, useContext, useState, useEffect } from "react";

const InvoiceContext = createContext();

const DEMO_INVOICES = [
  {
    invoiceNo: "INV-2025-001",
    project: "Bangalore DC Network Upgrade",
    status: "PAID",
    createdAt: new Date().toISOString(),
    items: [
      { id: 1, name: "MX204 Router", qty: 2, rate: 568924.43 },
      { id: 2, name: "QSFP+ Module", qty: 4, rate: 20853.92 },
    ],
    grandTotal: 1252116,
  },
  {
    invoiceNo: "INV-2025-002",
    project: "Mumbai Core Switch Expansion",
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    items: [
      { id: 3, name: "EX4400 Switch", qty: 2, rate: 303354.86 },
      { id: 4, name: "Power Supply", qty: 2, rate: 18468.72 },
    ],
    grandTotal: 643646,
  },
];

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    return saved ? JSON.parse(saved) : DEMO_INVOICES;
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // ✅ Add new invoice (from PO / Cart)
  const addInvoice = (invoice) => {
    setInvoices((prev) => [
      ...prev,
      {
        ...invoice,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);
export const useInvoices = () => useContext(InvoiceContext);
