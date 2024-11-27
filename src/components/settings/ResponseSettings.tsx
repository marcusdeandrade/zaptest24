import React from 'react';

export function ResponseSettings() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Response Configuration</h3>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Response Delay</label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Minimum (seconds)</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Maximum (seconds)</label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Allowed File Types</label>
          <div className="mt-2 space-y-2">
            {['Images', 'Documents', 'Audio'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">File Size Limits</label>
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <span className="text-sm text-gray-500">MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}