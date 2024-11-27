import React from 'react';
import { Menu, MessageSquare, Settings } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Menu className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-semibold">WhatsAI</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link to="/settings" className="text-gray-600 hover:text-gray-900">
                <Settings className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}