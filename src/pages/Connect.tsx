import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ConnectionHistory } from '../components/connect/ConnectionHistory';

export function Connect() {
  const isConnected = useStore((state) => state.isConnected);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">WhatsApp Connection</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          {isConnected ? (
            <div className="p-6 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium">WhatsApp is connected!</p>
              <p className="mt-2 text-sm text-green-600">You can now start receiving messages</p>
            </div>
          ) : (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                <img
                  src="placeholder-qr-code.png"
                  alt="QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh QR Code
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Open WhatsApp on your phone, go to Settings &gt; WhatsApp Web/Desktop and scan the QR code
              </p>
            </>
          )}
        </div>
      </div>

      <ConnectionHistory />
    </div>
  );
}