import React from 'react';
import { Conversation } from '../types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: '+1 234 567 8900',
    lastMessage: 'Hello! How can I help you today?',
    timestamp: new Date(),
    status: 'active',
  },
  {
    id: '2',
    contact: '+1 987 654 3210',
    lastMessage: 'Thanks for your question about pricing.',
    timestamp: new Date(Date.now() - 3600000),
    status: 'active',
  },
];

export function ConversationList() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Conversations</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {mockConversations.map((conversation) => (
          <li key={conversation.id} className="px-4 py-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{conversation.contact}</p>
                <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(conversation.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}