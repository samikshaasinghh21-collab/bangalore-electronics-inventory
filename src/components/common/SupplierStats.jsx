import React from 'react';
import StatCard from './StatCard';
import { formatCurrency } from '../../utils/helpers';

const SupplierStats = ({ supplier, loading = false }) => {
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

  if (!supplier) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard empty emptyMessage="No supplier data" />
        <StatCard empty emptyMessage="No supplier data" />
        <StatCard empty emptyMessage="No supplier data" />
        <StatCard empty emptyMessage="No supplier data" />
      </div>
    );
  }

  const totalOrders = supplier.totalOrders || 0;
  const outstandingAmount = supplier.outstandingAmount || 0;
  const avgOrderValue = totalOrders > 0 ? outstandingAmount / totalOrders : 0;
  const lastPurchaseDate = supplier.lastPurchaseDate;

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Total Orders"
        value={totalOrders.toString()}
        icon="📦"
        trend={supplier.orderTrend}
      />
      <StatCard
        title="Outstanding Amount"
        value={formatCurrency(outstandingAmount)}
        icon="💰"
        trend={supplier.outstandingTrend}
        danger={outstandingAmount > 50000}
      />
      <StatCard
        title="Avg Order Value"
        value={formatCurrency(avgOrderValue)}
        icon="📊"
        trend={supplier.avgOrderTrend}
      />
      <StatCard
        title="Last Purchase"
        value={lastPurchaseDate ? new Date(lastPurchaseDate).toLocaleDateString('en-IN') : '—'}
        icon="🕒"
        empty={!lastPurchaseDate}
        emptyMessage="No purchases yet"
      />
    </div>
  );
};

export default SupplierStats;
