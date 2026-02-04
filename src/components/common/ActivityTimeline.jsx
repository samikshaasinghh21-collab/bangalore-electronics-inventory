import React from "react";
import { formatDate, getRelativeTime } from "../../utils/helpers";

// Activity Item Component
const ActivityItem = ({ activity, isLast = false }) => {
  const getActivityIcon = (type) => {
    const icons = {
      PO_CREATED: "📦",
      PO_UPDATED: "✏️",
      PO_APPROVED: "✅",
      PO_RECEIVED: "📥",
      PAYMENT_MADE: "💰",
      PAYMENT_RECEIVED: "💳",
      INVOICE_CREATED: "📄",
      STATUS_CHANGED: "🔄",
      SUPPLIER_ADDED: "👤",
      SUPPLIER_UPDATED: "📝",
    };
    return icons[type] || "📋";
  };

  const getActivityColor = (type) => {
    const colors = {
      PO_CREATED: "bg-blue-100",
      PO_UPDATED: "bg-yellow-100",
      PO_APPROVED: "bg-green-100",
      PO_RECEIVED: "bg-purple-100",
      PAYMENT_MADE: "bg-red-100",
      PAYMENT_RECEIVED: "bg-emerald-100",
      INVOICE_CREATED: "bg-indigo-100",
      STATUS_CHANGED: "bg-orange-100",
      SUPPLIER_ADDED: "bg-cyan-100",
      SUPPLIER_UPDATED: "bg-slate-100",
    };
    return colors[type] || "bg-gray-100";
  };

  return (
    <div className="flex items-start space-x-3">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${getActivityColor(activity.type)}`}>
          {getActivityIcon(activity.type)}
        </div>
        {!isLast && <div className="w-px h-8 bg-slate-200 mt-2"></div>}
      </div>

      {/* Activity content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{activity.title}</p>
            <p className="text-xs text-slate-500 mt-1">{activity.description}</p>
            {activity.metadata && (
              <div className="mt-2 text-xs text-slate-400">
                {activity.metadata}
              </div>
            )}
          </div>
          <div className="text-xs text-slate-400 ml-4">
            {getRelativeTime(activity.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Timeline Component
const ActivityTimeline = ({ activities, loading = false, emptyMessage = "No activity yet" }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-3xl mb-3">📅</div>
        <p className="text-slate-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id || index}
          activity={activity}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
};

export default ActivityTimeline;
