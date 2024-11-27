import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface LogFiltersProps {
  activeFilter: 'all' | 'error' | 'warning' | 'info';
  onFilterChange: (filter: 'all' | 'error' | 'warning' | 'info') => void;
}

const filters = [
  { value: 'all', label: 'All' },
  { value: 'error', label: 'Errors', icon: AlertCircle, color: 'text-red-600' },
  { value: 'warning', label: 'Warnings', icon: AlertTriangle, color: 'text-yellow-600' },
  { value: 'info', label: 'Info', icon: Info, color: 'text-blue-600' },
] as const;

export function LogFilters({ activeFilter, onFilterChange }: LogFiltersProps) {
  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
            activeFilter === filter.value
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {filter.icon && <filter.icon className={`mr-1.5 h-4 w-4 ${filter.color}`} />}
          {filter.label}
        </button>
      ))}
    </div>
  );
}