import React from 'react';
import { format } from 'date-fns';

const connectionHistory = [
  { id: 1, timestamp: new Date(), status: 'connected', device: 'iPhone 12' },
  { id: 2, timestamp: new Date(Date.now() - 86400000), status: 'disconnected', device: 'iPhone 12' },
];

export function ConnectionHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Connection History</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {connectionHistory.map((entry) => (
            <li key={entry.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.device}</p>
                  <p className="text-sm text-gray-500">
                    {format(entry.timestamp, 'PPpp')}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    entry.status === 'connected'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}