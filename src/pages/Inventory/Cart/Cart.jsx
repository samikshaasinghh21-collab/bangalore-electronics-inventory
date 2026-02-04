import React from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Shopping Cart
          </h1>

          <button
            onClick={() => navigate("/inventory/purchase/orders")}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Purchase Orders
          </button>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-slate-500">Your cart is empty</p>

            <button
              onClick={() => navigate("/inventory")}
              className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Browse Inventory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Cart Items */}
            <div className="lg:col-span-2 rounded-xl bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Item</th>
                    <th className="px-6 py-4 text-right font-medium">Qty</th>
                    <th className="px-6 py-4 text-right font-medium">Rate</th>
                    <th className="px-6 py-4 text-right font-medium">Amount</th>
                    <th className="px-6 py-4 text-center font-medium">Action</th>
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
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            updateQty(
                              item.id,
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>

                      <td className="px-6 py-4 text-right text-slate-600">
                        ₹{item.rate.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4 text-right font-semibold">
                        ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-6 h-fit">
              <h2 className="mb-4 text-lg font-semibold">
                Order Summary
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
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/billing")}
                  className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                >
                  Proceed to Billing
                </button>

                <button
                  onClick={clearCart}
                  className="rounded-lg border border-slate-300 px-6 py-2 text-sm hover:bg-slate-100 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
