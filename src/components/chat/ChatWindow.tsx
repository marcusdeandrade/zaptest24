import React, { useState } from 'react';
import { Send, Paperclip, Image, Mic } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { ChatTags } from './ChatTags';
import { Message } from './Message';

export function ChatWindow() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { activeChat, addMessage } = useChatStore();
  const { sendMessage, isConnected } = useWhatsApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeChat && isConnected) {
      try {
        const newMessage = {
          id: crypto.randomUUID(),
          content: message,
          timestamp: new Date(),
          sender: null,
          type: 'text' as const,
          status: 'sent' as const,
        };
        
        await sendMessage(activeChat.contact.phone, message);
        addMessage(activeChat.id, newMessage);
        setMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
        // Handle error (show toast notification, etc.)
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeChat) {
      // Handle file upload
      console.log('File to upload:', file);
    }
  };

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{activeChat.contact.name}</h2>
            <p className="text-sm text-gray-500">{activeChat.contact.phone}</p>
          </div>
          <ChatTags chatId={activeChat.id} tags={activeChat.tags} />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {activeChat.messages.map((msg) => (
          <Message
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            isOutgoing={!msg.sender}
            status={msg.status}
          />
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <label className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <Paperclip className="h-5 w-5" />
            </label>
            <label className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Image className="h-5 w-5" />
            </label>
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 ${
                isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={!message.trim() || !isConnected}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}