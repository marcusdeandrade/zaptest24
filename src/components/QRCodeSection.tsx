import React from 'react';
import { QrCode } from 'lucide-react';

export function QRCodeSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
        <QrCode className="h-32 w-32 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Scan QR Code</h3>
        <p className="mt-2 text-sm text-gray-500">
          Open WhatsApp on your phone and scan the QR code to connect
        </p>
      </div>
    </div>
  );
}