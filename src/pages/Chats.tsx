import React from 'react';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';

export function Chats() {
  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4 -mt-4">
      <div className="w-80 bg-white rounded-lg shadow-sm overflow-hidden">
        <ChatList />
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
}