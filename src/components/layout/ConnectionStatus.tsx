import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ConnectionStatus() {
  const isConnected = useStore((state) => state.isConnected);

  return (
    <div className="px-6 py-3 border-b border-gray-200">
      <div className="flex items-center">
        {isConnected ? (
          <>
            <Wifi className="h-5 w-5 text-green-500" />
            <span className="ml-2 text-sm text-green-700">Connected</span>
          </>
        ) : (
          <>
            <WifiOff className="h-5 w-5 text-red-500" />
            <span className="ml-2 text-sm text-red-700">Disconnected</span>
          </>
        )}
      </div>
    </div>
  );
}