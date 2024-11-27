import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart2,
  Settings,
  Bot,
  ScrollText,
  QrCode
} from 'lucide-react';

const navigation = [
  { name: 'Connect', to: '/connect', icon: QrCode },
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Chats', to: '/chats', icon: MessageSquare },
  { name: 'Analytics', to: '/analytics', icon: BarChart2 },
  { name: 'Logs', to: '/logs', icon: ScrollText },
  { name: 'Bot', to: '/bot', icon: Bot },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">WhatsApp CRM</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
