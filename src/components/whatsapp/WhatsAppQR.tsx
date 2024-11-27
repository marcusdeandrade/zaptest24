import React, { useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, RefreshCw, Wifi, WifiOff, X } from 'lucide-react';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { cn } from '../../lib/utils';

interface WhatsAppQRProps {
  onClose: () => void;
}

export function WhatsAppQR({ onClose }: WhatsAppQRProps) {
  const { isConnected, qrCode, reconnect } = useWhatsApp();

  const handleRefreshQR = useCallback(() => {
    reconnect();
  }, [reconnect]);

  return (
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">WhatsApp Connection</span>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-600">Disconnected</span>
            </>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {!isConnected && (
        <div className={cn(
          "transition-all duration-300",
          qrCode ? "opacity-100" : "opacity-0"
        )}>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col items-center">
              {qrCode ? (
                <div className="w-48 h-48 p-2 bg-white rounded-lg">
                  <QRCodeSVG
                    value={qrCode}
                    size={176}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Waiting for QR code...</span>
                </div>
              )}
              
              <button
                onClick={handleRefreshQR}
                className="mt-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh QR
              </button>
              
              <p className="mt-3 text-xs text-gray-500 text-center">
                Open WhatsApp on your phone and scan this code to connect
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}