import PieChart from "../../components/charts/PieChart.jsx";
import Card from "../../components/common/Card.jsx";
import StockPage from "./Stock/StockPage.jsx";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const stockTrendData = [
  { date: "2026-01-01", in: 50, out: 20 },
  { date: "2026-01-02", in: 30, out: 10 },
  { date: "2026-01-03", in: 40, out: 25 },
  { date: "2026-01-04", in: 60, out: 15 },
  { date: "2026-01-05", in: 35, out: 20 },
];

export default function InventoryDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
      {/* Main Stock Trend Line Chart */}
      <div className="lg:col-span-2">
        <Card title="📈 Stock Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Line type="monotone" dataKey="in" stroke="#4CAF50" name="Stock In" />
              <Line type="monotone" dataKey="out" stroke="#E91E63" name="Stock Out" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Sidebar: Pie Chart for Stock Distribution */}
      <div>
        <Card title="📊 Stock Distribution">
          <PieChart />
        </Card>
      </div>
    </div>
  );
}
