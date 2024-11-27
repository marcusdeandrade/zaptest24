import React from 'react';
import { Plus, X } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import type { Tag } from '../../types/chat';

interface ChatTagsProps {
  chatId: string;
  tags: Tag[];
}

export function ChatTags({ chatId, tags }: ChatTagsProps) {
  const { addTagToChat, removeTagFromChat, tags: allTags } = useChatStore();

  const handleAddTag = (tagId: string) => {
    addTagToChat(chatId, tagId);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
        >
          {tag.name}
          <button
            onClick={() => removeTagFromChat(chatId, tag.id)}
            className="ml-1 hover:opacity-75"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <div className="relative inline-block">
        <button
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Tag
        </button>
        <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg hidden group-hover:block">
          {allTags
            .filter((tag) => !tags.find((t) => t.id === tag.id))
            .map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleAddTag(tag.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {tag.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}