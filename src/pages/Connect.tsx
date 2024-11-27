import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ConnectionHistory } from '../components/connect/ConnectionHistory';
import { WhatsAppQR } from '../components/whatsapp/WhatsAppQR';
import { whatsappService } from '../services/whatsapp';

export function Connect() {
  const isConnected = useStore((state) => state.isConnected);

  useEffect(() => {
    // Initialize WhatsApp service when component mounts
    console.log('Initializing WhatsApp service from Connect page');
    whatsappService.initialize();

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up WhatsApp service');
      whatsappService.disconnect();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">WhatsApp Connection</h2>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="text-center">
          {isConnected ? (
            <div className="p-6 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium">WhatsApp is connected!</p>
              <p className="mt-2 text-sm text-green-600">You can now start receiving messages</p>
            </div>
          ) : (
            <WhatsAppQR onClose={() => {}} />
          )}
        </div>
      </div>

      <ConnectionHistory />
    </div>
  );
}
