import PageLayout from "../../components/layout/PageLayout";
import BarChart from "../../components/charts/BarChart"; // default import
import { LineChart } from "../../components/charts/LineChart"; // named import
import PieChart from "../../components/charts/PieChart";   // optional

export default function MainDashboard() {
  return (
    <PageLayout>
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Sales (INR)" value="6,32,50,893" />
        <StatCard title="Total Purchase (INR)" value="3,15,68,980" />
        <StatCard title="Outstanding (INR)" value="1,59,47,688" />
        <StatCard title="Low Stock Items" value="18" danger />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold mb-4">Recent Invoices</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Invoice</th>
                <th>Customer</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <InvoiceRow no="INV-25" customer="Yadav Electronics" amount="72,216" date="24/Jan/2026"/>
              <InvoiceRow no="INV-24" customer="Rana Enterprises" amount="39,500" date="20/Jan/2026"/>
              <InvoiceRow no="INV-23" customer="Sharma Agencies" amount="32,500" date="18/Jan/2026"/>
            </tbody>
          </table>
        </Card>

        <Card>
          <h2 className="font-semibold mb-2">Today’s Invoice</h2>
          <p className="text-3xl font-bold mb-4">₹72,216</p>
          <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
            + Create Invoice
          </button>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h2 className="font-semibold mb-4">Sales vs Purchase</h2>
          <BarChart />
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">Receipts & Expenses</h2>
          <LineChart />
        </Card>
      </div>
    </PageLayout>
  );
}

// --- Helper Components ---
function StatCard({ title, value, danger }) {
  return (
    <div
      className={`rounded-xl p-5 shadow ${
        danger ? "bg-red-100 text-red-700" : "bg-white"
      }`}
    >
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow p-5 ${className}`}>{children}</div>;
}

function InvoiceRow({ no, customer, amount, date }) {
  return (
    <tr className="border-b last:border-none">
      <td>{no}</td>
      <td>{customer}</td>
      <td>{date}</td>
      <td className="text-right font-medium">₹{amount}</td>
    </tr>
  );
}
