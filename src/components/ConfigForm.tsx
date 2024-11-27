import React, { useState } from 'react';
import { SystemConfig } from '../types';

export function ConfigForm() {
  const [config, setConfig] = useState<SystemConfig>({
    openaiApiKey: '',
    assistantId: '',
    model: 'gpt-4',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log('Saving config:', config);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            OpenAI API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={config.openaiApiKey}
            onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="assistantId" className="block text-sm font-medium text-gray-700">
            Assistant ID
          </label>
          <input
            type="text"
            id="assistantId"
            value={config.assistantId}
            onChange={(e) => setConfig({ ...config, assistantId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <select
            id="model"
            value={config.model}
            onChange={(e) => setConfig({ ...config, model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Configuration
        </button>
      </div>
    </form>
  );
}