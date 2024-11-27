import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { LogEntry } from '../../types';

const iconMap = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  error: 'text-red-600 bg-red-50',
  warning: 'text-yellow-600 bg-yellow-50',
  info: 'text-blue-600 bg-blue-50',
};

interface LogListProps {
  logs: LogEntry[];
}

export function LogList({ logs }: LogListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500">No logs to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <ul className="divide-y divide-gray-200">
        {logs.map((log) => {
          const Icon = iconMap[log.type];
          return (
            <li key={log.id} className="p-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${colorMap[log.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{log.description}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {log.timestamp.toLocaleString()}
                  </p>
                  {log.details && (
                    <pre className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}