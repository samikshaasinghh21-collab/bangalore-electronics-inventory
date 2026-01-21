import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChart() {
  const data = [
    { name: "Jan", Sales: 4000, Purchases: 2400 },
    { name: "Feb", Sales: 3000, Purchases: 1398 },
    { name: "Mar", Sales: 5000, Purchases: 3200 },
    { name: "Apr", Sales: 4780, Purchases: 2500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sales" fill="#14b8a6" />
        <Bar dataKey="Purchases" fill="#6366f1" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
