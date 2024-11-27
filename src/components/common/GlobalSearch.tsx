import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const conversations = useStore((state) => state.conversations);

  const filteredConversations = query
    ? conversations.filter((conv) =>
        conv.contact.toLowerCase().includes(query.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-gray-600"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search conversations, settings..."
                  className="w-full p-4 pl-12 pr-10 text-gray-900 placeholder-gray-500 border-0 focus:ring-0"
                  autoFocus
                />
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {query && (
                <div className="max-h-96 overflow-y-auto border-t">
                  {filteredConversations.length > 0 ? (
                    <ul className="py-2">
                      {filteredConversations.map((conv) => (
                        <li
                          key={conv.id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <p className="font-medium text-gray-900">{conv.contact}</p>
                          <p className="text-sm text-gray-500">{conv.lastMessage}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-sm text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}