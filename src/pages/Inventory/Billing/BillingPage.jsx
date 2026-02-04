import React from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const BillingPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">
            No items available for billing
          </p>

          <button
            onClick={() => navigate("/inventory")}
            className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Go to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Billing & Checkout
          </h1>

         <button
  onClick={() => navigate("/inventory/cart")}
  className="text-sm text-slate-600 hover:text-slate-900"
>
  ← Back to Cart
</button>

        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Billing Items */}
          <div className="lg:col-span-2 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                Items Summary
              </h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Item</th>
                  <th className="px-6 py-4 text-right font-medium">Qty</th>
                  <th className="px-6 py-4 text-right font-medium">Rate</th>
                  <th className="px-6 py-4 text-right font-medium">Amount</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {item.qty}
                    </td>

                    <td className="px-6 py-4 text-right text-slate-600">
                      ₹{item.rate.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold">
                      ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-6 h-fit">
            <h2 className="mb-4 text-lg font-semibold">
              Payment Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <span>Total Payable</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => navigate("/invoice")}
                className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Generate Invoice
              </button>

              <button
                onClick={() => navigate("/payment")}
                className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
              >
                Proceed to Payment
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="rounded-lg border border-slate-300 px-6 py-2 text-sm hover:bg-slate-100 transition"
              >
                Edit Cart
              </button>
            </div>

            {/* Footer Note */}
            <p className="mt-4 text-xs text-slate-500 text-center">
              Taxes are calculated as per applicable government rules
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BillingPage;
