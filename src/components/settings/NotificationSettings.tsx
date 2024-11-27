import React from 'react';
import { Bell, Globe } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h3>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
          <div className="mt-2">
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <Bell className="h-4 w-4 mr-1.5" />
                Test
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Webhook URL</label>
          <div className="mt-2">
            <div className="flex items-center space-x-4">
              <input
                type="url"
                placeholder="https://"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <Globe className="h-4 w-4 mr-1.5" />
                Test
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Notification Events</label>
          <div className="mt-2 space-y-2">
            {[
              'New conversation started',
              'Message received',
              'Connection status changes',
              'Error alerts',
            ].map((event) => (
              <label key={event} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{event}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}