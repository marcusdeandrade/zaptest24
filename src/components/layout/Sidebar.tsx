import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Settings, BarChart2, FileText, Bot, LogOut, QrCode, Wifi, WifiOff } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { WhatsAppQR } from '../whatsapp/WhatsAppQR';

const navigation = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Chats', to: '/chats', icon: MessageSquare },
  { name: 'Bot', to: '/bot', icon: Bot },
  { name: 'Analytics', to: '/analytics', icon: BarChart2 },
  { name: 'Logs', to: '/logs', icon: FileText },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  const [showQR, setShowQR] = useState(false);
  const { user, isConnected } = useStore();

  return (
    <div className="flex flex-col h-full w-72 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <span className="text-xl font-semibold text-green-600">WhatsAI</span>
      </div>

      <button
        onClick={() => setShowQR(!showQR)}
        className="mx-4 mt-4 mb-2 flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <QrCode className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">WhatsApp QR Code</span>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </div>
      </button>

      {showQR && <WhatsAppQR onClose={() => setShowQR(false)} />}

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="flex items-center">
            <img
              src={user.avatar || 'https://via.placeholder.com/40'}
              alt=""
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        )}
        <button className="mt-4 flex items-center text-sm text-gray-600 hover:text-gray-900">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}