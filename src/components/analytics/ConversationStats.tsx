import React from 'react';

const stats = [
  { label: 'Average Session Duration', value: '8m 42s' },
  { label: 'Messages per Conversation', value: '12.3' },
  { label: 'Peak Hours', value: '2PM - 5PM' },
  { label: 'User Satisfaction', value: '4.8/5' },
];

export function ConversationStats() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Conversation Statistics</h3>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
            <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}