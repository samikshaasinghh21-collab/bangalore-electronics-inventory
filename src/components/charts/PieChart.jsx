import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Example data, you can pass this as props
const defaultData = [
  { name: "Business", value: 8000 },
  { name: "Rent", value: 2500 },
  { name: "Deposit", value: 3000 },
  { name: "Audit", value: 1800 },
];

// Optional colors for slices
const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63"];

const PieChart = ({ data = defaultData }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h4 className="font-semibold mb-4">Income Split</h4>
      <ResponsiveContainer width="100%" height={250}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={(entry) =>
              new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(entry.value)
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value)
            }
          />
          <Legend verticalAlign="bottom" height={36} />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
