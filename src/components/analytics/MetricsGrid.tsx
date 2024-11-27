import React from 'react';
import { MessageSquare, Users, Clock, Zap } from 'lucide-react';
import type { Metric } from '../../types';

const metrics: Metric[] = [
  {
    label: 'Total Conversations',
    value: '2,345',
    change: 12,
    trend: 'up',
  },
  {
    label: 'Active Users',
    value: '432',
    change: -2,
    trend: 'down',
  },
  {
    label: 'Avg. Response Time',
    value: '1.2m',
    change: -15,
    trend: 'up',
  },
  {
    label: 'Messages Today',
    value: '1,234',
    change: 8,
    trend: 'up',
  },
];

const icons = {
  'Total Conversations': MessageSquare,
  'Active Users': Users,
  'Avg. Response Time': Clock,
  'Messages Today': Zap,
};

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = icons[metric.label as keyof typeof icons];
        return (
          <div key={metric.label} className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{metric.label}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                      {metric.change && (
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {metric.change}%
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}