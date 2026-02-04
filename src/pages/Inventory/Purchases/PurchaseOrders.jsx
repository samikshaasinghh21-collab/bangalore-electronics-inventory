import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useInvoices } from "../../../context/InvoiceContext";
import { useNavigate } from "react-router-dom";

const PurchaseOrders = () => {
  const { cart, updateQty, removeItem, clearCart, addToCart } = useCart();
  const { addInvoice } = useInvoices();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");

  const [showProductForm, setShowProductForm] = useState(false);

  const [productForm, setProductForm] = useState({
    part_number: "",
    product_description: "",
    hsn_code: "",
    uom: "NOS",
    quantity: 1,
    reorder_level: "",
    serial_required: false,
    purchase_price: "",
    selling_price: "",
    gst_rate: 18,
    status: "ACTIVE",
  });

  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (sum, i) => sum + i.qty * i.rate,
    0
  );

  const gstAmount = subtotal * gstRate;
  const grandTotal = subtotal + gstAmount;

  // ✅ Select / Unselect item
  const toggleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  // ✅ Add selected items back to cart (or confirm selection)
  const addSelectedToCart = () => {
    selectedItems.forEach((item) => addToCart(item));
    setSelectedItems([]);
    navigate("/inventory/cart");
  };

  // ✅ Save PO
  const savePO = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const invoice = {
      invoiceNo: `INV-${Date.now()}`,
      supplier: "Juniper Networks",
      items: cart,
      subtotal,
      gstAmount,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    addInvoice(invoice);
    clearCart();
    navigate("/invoices");
  };

  const saveProductAndAddToCart = () => {
    if (!productForm.part_number || !productForm.hsn_code) {
      alert("Part Number and HSN Code are mandatory");
      return;
    }

    addToCart({
      id: Date.now(),
      name: productForm.part_number,
      description: productForm.product_description,
      hsn: productForm.hsn_code,
      qty: Number(productForm.quantity),
      unit: productForm.uom,
      rate: Number(productForm.purchase_price),
      gst_rate: productForm.gst_rate,
      serial_required: productForm.serial_required,
    });

    setShowProductForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Order</h1>
        <button
          onClick={() => setShowProductForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + New Product
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-center">Select</th>
              <th className="p-2">Item</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No items in cart
                </td>
              </tr>
            )}

            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                {/* Select */}
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((i) => i.id === item.id)}
                    onChange={() => toggleSelect(item)}
                  />
                </td>

                <td className="p-2 font-medium">{item.name}</td>

                {/* Qty Update */}
                <td className="p-2 text-right">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    className="border w-20 px-1"
                    onChange={(e) =>
                      updateQty(item.id, Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2 text-right">
                  ₹{item.rate.toLocaleString("en-IN")}
                </td>

                <td className="p-2 text-right font-semibold">
                  ₹{(item.qty * item.rate).toLocaleString("en-IN")}
                </td>

                {/* Actions */}
                <td className="p-2 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-4 text-right">
        <p>Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
        <p>GST (18%): ₹{gstAmount.toLocaleString("en-IN")}</p>
        <p className="font-bold text-lg">
          Grand Total: ₹{grandTotal.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 justify-end">
        <button
          onClick={addSelectedToCart}
          disabled={selectedItems.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Selected to Cart
        </button>

        <button
          onClick={savePO}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Purchase Order
        </button>
      </div>

      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Product Master Entry</h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Part Number / SKU *"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({ ...productForm, part_number: e.target.value })
                }
              />

              <input
                placeholder="HSN Code *"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({ ...productForm, hsn_code: e.target.value })
                }
              />

              <input
                placeholder="Product Description"
                className="border p-2 col-span-2"
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    product_description: e.target.value,
                  })
                }
              />

              <input
                placeholder="Purchase Price"
                type="number"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    purchase_price: e.target.value,
                  })
                }
              />

              <input
                placeholder="Selling Price"
                type="number"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    selling_price: e.target.value,
                  })
                }
              />

              <input
                placeholder="Quantity"
                type="number"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({ ...productForm, quantity: e.target.value })
                }
              />

              <input
                placeholder="Reorder Level"
                type="number"
                className="border p-2"
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    reorder_level: e.target.value,
                  })
                }
              />

              <select
                className="border p-2"
                onChange={(e) =>
                  setProductForm({ ...productForm, uom: e.target.value })
                }
              >
                <option value="NOS">NOS</option>
                <option value="PCS">PCS</option>
                <option value="KG">KG</option>
              </select>

              <select
                className="border p-2"
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    gst_rate: Number(e.target.value),
                  })
                }
              >
                <option value={18}>GST 18%</option>
                <option value={12}>GST 12%</option>
                <option value={5}>GST 5%</option>
                <option value={0}>GST 0%</option>
              </select>

              <label className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      serial_required: e.target.checked,
                    })
                  }
                />
                Serial Number Required
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowProductForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProductAndAddToCart}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
