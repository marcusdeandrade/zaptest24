import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Assistant } from '../../types';

const assistants: Assistant[] = [
  {
    id: '1',
    name: 'Customer Service Bot',
    type: 'customer-service',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sales Assistant',
    type: 'sales',
    isActive: false,
  },
];

export function AssistantSettings() {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">AI Assistants</h3>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Assistant
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {assistants.map((assistant) => (
            <li key={assistant.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{assistant.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{assistant.type}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={assistant.isActive}
                      onChange={() => {}}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-500">Active</span>
                  </label>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}