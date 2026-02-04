import React from 'react';

const CustomerDrawer = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium">{customer.name}</h3>
              <p className="text-sm text-slate-500">{customer.id}</p>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-slate-500">Contact Person:</span>
                <div className="font-medium">{customer.contactPerson}</div>
              </div>
              <div>
                <span className="text-sm text-slate-500">Phone:</span>
                <div className="font-medium">{customer.phone}</div>
              </div>
              <div>
                <span className="text-sm text-slate-500">Email:</span>
                <div className="font-medium">{customer.email}</div>
              </div>
              <div>
                <span className="text-sm text-slate-500">City:</span>
                <div className="font-medium">{customer.city}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDrawer;
