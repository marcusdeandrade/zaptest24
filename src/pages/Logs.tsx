import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { LogList } from '../components/logs/LogList';
import { LogFilters } from '../components/logs/LogFilters';

export function Logs() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');
  const logs = useStore((state) => state.logs);

  const filteredLogs = activeFilter === 'all' 
    ? logs 
    : logs.filter((log) => log.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">System Logs</h2>
        <LogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      <LogList logs={filteredLogs} />
    </div>
  );
}