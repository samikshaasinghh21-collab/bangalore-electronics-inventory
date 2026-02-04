import React, { useState, useEffect } from "react";

const SupplierForm = ({ supplier, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    gstin: "",
    pan: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    paymentTerms: "Net 30",
    creditLimit: "",
    currency: "INR",
    taxType: "GST",
    notes: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        contactPerson: supplier.contactPerson || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        gstin: supplier.gstin || "",
        pan: supplier.pan || "",
        address: supplier.address || "",
        city: supplier.city || "",
        state: supplier.state || "",
        country: supplier.country || "India",
        paymentTerms: supplier.paymentTerms || "Net 30",
        creditLimit: supplier.creditLimit || "",
        currency: supplier.currency || "INR",
        taxType: supplier.taxType || "GST",
        notes: supplier.notes || "",
      });
    } else {
      setFormData({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        gstin: "",
        pan: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        paymentTerms: "Net 30",
        creditLimit: "",
        currency: "INR",
        taxType: "GST",
        notes: "",
      });
    }
  }, [supplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {supplier ? "Edit Supplier" : "Add New Supplier"}
            </h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Supplier Name *"
                className="border p-2 rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Contact Person *"
                className="border p-2 rounded"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone *"
                className="border p-2 rounded"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Business Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="GSTIN"
                className="border p-2 rounded"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              />
              <input
                type="text"
                placeholder="PAN"
                className="border p-2 rounded"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-2 rounded col-span-2"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 rounded"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
              <input
                type="text"
                placeholder="Country"
                className="border p-2 rounded"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>

          {/* Commercials */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Commercial Terms</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="border p-2 rounded"
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
              </select>
              <input
                type="number"
                placeholder="Credit Limit"
                className="border p-2 rounded"
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
              />
              <select
                className="border p-2 rounded"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <select
                className="border p-2 rounded"
                value={formData.taxType}
                onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
              >
                <option value="GST">GST</option>
                <option value="VAT">VAT</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Notes & Documents</h3>
            <textarea
              placeholder="Internal notes..."
              className="border p-2 rounded w-full h-24"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            <div className="mt-3">
              <input type="file" multiple className="border p-2 rounded" />
              <p className="text-sm text-slate-500 mt-1">Upload PDFs, contracts, etc.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {supplier ? "Update Supplier" : "Create Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
