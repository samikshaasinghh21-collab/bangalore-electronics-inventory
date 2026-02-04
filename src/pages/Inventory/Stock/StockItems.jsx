import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const StockItems = () => {
  const { addToCart } = useCart();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "MX204-HWBASE-AC-FS",
      description:
        "MX204 Fixed AC System - HW and STD Junos; Feature right to use must be ordered separately",
      hsn: "85176290",
      qty: 2,
      unit: "Nos",
      rate: 568924.43,
    },
    {
      id: 2,
      name: "CBL-EX-PWR-C13-IN",
      description: "AC Power Cable - India (6A/250V, 2.5m)",
      hsn: "854442",
      qty: 4,
      unit: "Nos",
      rate: 1746.77,
    },
    {
      id: 3,
      name: "QSFPP 4X10GE-SR",
      description:
        "QSFP+, 4x10GBASE-SR, MMF OM3/OM4, MPO-12 connector",
      hsn: "851762",
      qty: 6,
      unit: "Nos",
      rate: 20853.92,
    },
    {
      id: 4,
      name: "SFPP-10G-LR-C",
      description: "SFP, 1G, Copper 100m, RJ-45 connector",
      hsn: "85176290",
      qty: 8,
      unit: "Nos",
      rate: 2696.76,
    },
    {
      id: 5,
      name: "RJ45 CONNECTOR (SFP-1G-T-C)",
      description: "SFP, 1G, Copper 100m",
      hsn: "85366990",
      qty: 8,
      unit: "Nos",
      rate: 4208.58,
    },
    {
      id: 6,
      name: "S-MX-4C-A1-C1-P",
      description: "SW, MX, 4x100GE ports, Adv1, Class 1, Perpetual",
      hsn: "997331",
      qty: 2,
      unit: "Nos",
      rate: 201567.49,
    },
    {
      id: 7,
      name: "PAR-SUP-MX-4C-A1P",
      description: "PSS Basic Support for S-MX-4C-A1-C1-P",
      hsn: "998313",
      qty: 2,
      unit: "Nos",
      rate: 226849.61,
    },
    {
      id: 8,
      name: "PAR-NDS-MX204-B",
      description: "PSS Next Day Ship Support for MX204-HW-BASE",
      hsn: "998313",
      qty: 2,
      unit: "Nos",
      rate: 206968.67,
    },
    {
      id: 9,
      name: "EX9208-RED3B-AC",
      description:
        "EX9208 8-slot chassis with routing engines, PSUs, fan tray",
      hsn: "85176290",
      qty: 2,
      unit: "Nos",
      rate: 1940647.0,
    },
    {
      id: 10,
      name: "CBL-M-PWR-RA-EU",
      description: "M320 AC Power Cable, Europe, Right Angle",
      hsn: "85444299",
      qty: 8,
      unit: "Nos",
      rate: 2083.86,
    },
    {
      id: 11,
      name: "EX9200-40XS",
      description: "0-port 10GbE SFP+ line card; MACsec capable",
      hsn: "85176290",
      qty: 2,
      unit: "Nos",
      rate: 962865.9,
    },
    {
      id: 12,
      name: "SFPP-10G-SR-C",
      description: "SFP+, 10GBASE-SR, Duplex LC connector",
      hsn: "85176290",
      qty: 20,
      unit: "Nos",
      rate: 2574.18,
    },
    {
      id: 13,
      name: "SFP-1G-SX-C",
      description: "SFP, 1G, MMF, Duplex LC connector",
      hsn: "85176290",
      qty: 28,
      unit: "Nos",
      rate: 1866.28,
    },
    {
      id: 14,
      name: "PAR-NDS-EX9208-3B",
      description: "PSS Next Day Ship Support for EX9208-BASE3B",
      hsn: "998313",
      qty: 2,
      unit: "Nos",
      rate: 1198257.8,
    },
    {
      id: 15,
      name: "EX4400-24X",
      description: "24x10GbaseX switch with 2x100G uplink ports",
      hsn: "851762",
      qty: 2,
      unit: "Nos",
      rate: 303354.86,
    },
    {
      id: 16,
      name: "EX4400-EM-1C",
      description: "1x100G MACsec AES256 extension module",
      hsn: "851762",
      qty: 2,
      unit: "Nos",
      rate: 69395.6,
    },
    {
      id: 17,
      name: "S-EX-P-C2-P",
      description: "SW, EX, Premium, Class 2 (24 ports), Perpetual",
      hsn: "997311",
      qty: 2,
      unit: "Nos",
      rate: 66627.34,
    },
    {
      id: 18,
      name: "JPSU-550-C-AC-AFO",
      description: "550W compact AC power supply for EX4400",
      hsn: "850440",
      qty: 2,
      unit: "Nos",
      rate: 18468.72,
    },
    {
      id: 19,
      name: "CBL-EX-PWR-C13-IN",
      description: "AC Power Cable - India (6A/250V, 2.5m)",
      hsn: "854442",
      qty: 2,
      unit: "Nos",
      rate: 1746.77,
    },
  ]);

  const increaseQty = (id) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  };

  const decreaseQty = (id) => {
    setItems(items.map(i =>
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">
        Purchase Order – Stock Items
      </h1>
      <p className="mb-4 text-gray-600">
        Bangalore Electronics · PO# 2K25BEPO7
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">HSN</th>
              <th className="px-4 py-2 text-center">Qty</th>
              <th className="px-4 py-2 text-right">Rate (₹)</th>
              <th className="px-4 py-2 text-right">Amount (₹)</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{item.name}</td>
                <td className="px-4 py-2 text-gray-600">{item.description}</td>
                <td className="px-4 py-2">{item.hsn}</td>

                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </td>

                <td className="px-4 py-2 text-right">
                  {item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>

                <td className="px-4 py-2 text-right font-semibold">
                  {(item.qty * item.rate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockItems;
