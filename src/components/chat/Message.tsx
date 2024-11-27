import React from 'react';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface MessageProps {
  content: string;
  timestamp: Date;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export function Message({ content, timestamp, isOutgoing, status }: MessageProps) {
  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOutgoing ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs opacity-75">
            {format(timestamp, 'HH:mm')}
          </span>
          {isOutgoing && status && (
            <span className="text-xs">
              {status === 'read' ? (
                <CheckCheck className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}