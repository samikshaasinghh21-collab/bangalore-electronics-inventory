import React from 'react';

const StatCard = ({
  title,
  value,
  icon,
  trend,
  danger = false,
  loading = false,
  empty = false,
  emptyMessage = 'No data available'
}) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 p-4 rounded-lg border border-slate-200 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-20"></div>
            <div className="h-6 bg-slate-200 rounded w-16"></div>
          </div>
          <div className="w-8 h-8 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="text-slate-400 text-sm">{emptyMessage}</div>
          </div>
          <div className="text-2xl opacity-50">{icon}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white to-slate-50 p-4 rounded-lg border border-slate-200 ${danger ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-2xl font-bold ${danger ? 'text-red-700' : 'text-slate-900'}`}>
            {value}
          </div>
          <div className="text-sm text-slate-500">{title}</div>
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      {trend !== undefined && trend !== null && (
        <div className={`text-xs mt-2 ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-slate-500'}`}>
          {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}% from last month
        </div>
      )}
    </div>
  );
};

export default StatCard;
