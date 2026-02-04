import React from 'react';
import StatCard from './StatCard';
import { formatCurrency } from '../../utils/helpers';

const CustomerStats = ({ customer, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard loading />
        <StatCard loading />
        <StatCard loading />
        <StatCard loading />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard empty emptyMessage="No customer data" />
        <StatCard empty emptyMessage="No customer data" />
        <StatCard empty emptyMessage="No customer data" />
        <StatCard empty emptyMessage="No customer data" />
      </div>
    );
  }

  const totalOrders = customer.totalOrders || 0;
  const outstandingAmount = customer.outstandingAmount || 0;
  const creditLimit = customer.creditLimit || 0;
  const creditUsed = (outstandingAmount / creditLimit) * 100;
  const lastInvoiceDate = customer.lastInvoiceDate;

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Total Orders"
        value={totalOrders.toString()}
        icon="📦"
        trend={customer.orderTrend}
      />
      <StatCard
        title="Outstanding Receivable"
        value={formatCurrency(outstandingAmount)}
        icon="💰"
        trend={customer.outstandingTrend}
        danger={outstandingAmount > creditLimit}
      />
      <StatCard
        title="Credit Used"
        value={`${creditUsed.toFixed(1)}%`}
        icon="📊"
        trend={customer.creditTrend}
        danger={creditUsed > 90}
      />
      <StatCard
        title="Last Invoice"
        value={lastInvoiceDate ? new Date(lastInvoiceDate).toLocaleDateString('en-IN') : '—'}
        icon="🕒"
        empty={!lastInvoiceDate}
        emptyMessage="No invoices yet"
      />
    </div>
  );
};

export default CustomerStats;
