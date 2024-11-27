import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { format } from 'date-fns';
import { ChatTags } from './ChatTags';

export function ChatList() {
  const { chats, setActiveChat, activeChat } = useChatStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.contact.phone.includes(searchTerm);
    const matchesTag = filterTag ? chat.tags.some((tag) => tag.id === filterTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          className="w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter by Tags
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No conversations found</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredChats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeChat?.id === chat.id ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">
                        {chat.contact.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {chat.lastMessage &&
                          format(new Date(chat.lastMessage.timestamp), 'HH:mm')}
                      </p>
                    </div>
                    <div className="mt-1">
                      <ChatTags chatId={chat.id} tags={chat.tags} />
                    </div>
                    {chat.lastMessage && (
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {chat.lastMessage.content}
                      </p>
                    )}
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-green-500 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}