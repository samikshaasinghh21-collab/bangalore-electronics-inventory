import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function LineChart() {
  const data = [
    { name: "Jan", Receipts: 4000, Expenses: 2400 },
    { name: "Feb", Receipts: 3000, Expenses: 1398 },
    { name: "Mar", Receipts: 5000, Expenses: 3200 },
    { name: "Apr", Receipts: 4780, Expenses: 2500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Receipts" stroke="#14b8a6" strokeWidth={2} />
        <Line type="monotone" dataKey="Expenses" stroke="#6366f1" strokeWidth={2} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
