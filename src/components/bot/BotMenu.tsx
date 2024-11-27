import React, { useState, useEffect } from 'react';
import { Bot, Upload, Link as LinkIcon, Check, X, Send } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

interface Assistant {
  id: string;
  name: string;
  model: string;
}

const mockAssistants: Assistant[] = [
  { id: 'asst_1', name: 'Customer Service Bot', model: 'gpt-4' },
  { id: 'asst_2', name: 'Sales Assistant', model: 'gpt-4' },
  { id: 'asst_3', name: 'Technical Support', model: 'gpt-3.5-turbo' },
];

export function BotMenu() {
  const [config, setConfig] = useStore((state) => [state.config, state.setConfig]);
  const [dragActive, setDragActive] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState('');
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);
  const [assistantValid, setAssistantValid] = useState<boolean | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [customAssistantId, setCustomAssistantId] = useState('');

  useEffect(() => {
    if (config?.openaiApiKey) {
      validateApiKey(config.openaiApiKey);
    }
  }, [config?.openaiApiKey]);

  useEffect(() => {
    if (config?.assistantId) {
      validateAssistant(config.assistantId);
    }
  }, [config?.assistantId]);

  const validateApiKey = async (key: string) => {
    // Simulate API validation
    setTimeout(() => {
      setApiKeyValid(key.startsWith('sk-') && key.length > 20);
    }, 500);
  };

  const validateAssistant = async (id: string) => {
    // Simulate assistant validation
    setTimeout(() => {
      setAssistantValid(id.startsWith('asst_') && id.length > 10);
    }, 500);
  };

  const handleSubmitApiKey = async () => {
    if (apiKeyValid) {
      // Handle API key submission
      console.log('Submitting API key:', config?.openaiApiKey);
    }
  };

  const handleSubmitAssistant = async () => {
    if (assistantValid) {
      // Handle assistant submission
      console.log('Submitting assistant:', config?.assistantId);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    console.log('Files to upload:', files);
  };

  const handleLinkAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink && !links.includes(newLink)) {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  };

  const handleAssistantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      const assistant = mockAssistants.find(a => a.id === value);
      setSelectedAssistant(assistant || null);
      setConfig({ ...config, assistantId: value });
      setCustomAssistantId('');
    } else {
      setSelectedAssistant(null);
    }
  };

  const handleCustomAssistantIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAssistantId(value);
    setConfig({ ...config, assistantId: value });
    setSelectedAssistant(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      <div className="flex items-center space-x-3">
        <Bot className="h-8 w-8 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Bot Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* OpenAI API Key Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-700">OpenAI API Key</h3>
            <div className={cn(
              "h-2 w-2 rounded-full",
              apiKeyValid === true && "bg-green-500",
              apiKeyValid === false && "bg-red-500",
              apiKeyValid === null && "bg-gray-300"
            )} />
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="password"
                className={cn(
                  "block w-full pr-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500",
                  apiKeyValid === true && "border-green-500",
                  apiKeyValid === false && "border-red-500"
                )}
                placeholder="sk-..."
                value={config?.openaiApiKey || ''}
                onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {apiKeyValid === true && <Check className="h-5 w-5 text-green-500" />}
                {apiKeyValid === false && <X className="h-5 w-5 text-red-500" />}
              </div>
            </div>
            <button
              onClick={handleSubmitApiKey}
              disabled={!apiKeyValid}
              className={cn(
                "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md",
                apiKeyValid
                  ? "text-white bg-green-600 hover:bg-green-700"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </button>
          </div>
        </div>

        {/* Assistant Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-700">Assistant</h3>
            <div className={cn(
              "h-2 w-2 rounded-full",
              assistantValid === true && "bg-green-500",
              assistantValid === false && "bg-red-500",
              assistantValid === null && "bg-gray-300"
            )} />
          </div>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <select
                  className={cn(
                    "block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500",
                    assistantValid === true && "border-green-500",
                    assistantValid === false && "border-red-500"
                  )}
                  value={selectedAssistant?.id || ''}
                  onChange={handleAssistantChange}
                >
                  <option value="">Select an assistant</option>
                  {mockAssistants.map((assistant) => (
                    <option key={assistant.id} value={assistant.id}>
                      {assistant.name} ({assistant.model})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  className={cn(
                    "block w-full pr-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500",
                    assistantValid === true && "border-green-500",
                    assistantValid === false && "border-red-500"
                  )}
                  placeholder="Custom Assistant ID (asst_...)"
                  value={customAssistantId}
                  onChange={handleCustomAssistantIdChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {assistantValid === true && <Check className="h-5 w-5 text-green-500" />}
                  {assistantValid === false && <X className="h-5 w-5 text-red-500" />}
                </div>
              </div>
              <button
                onClick={handleSubmitAssistant}
                disabled={!assistantValid}
                className={cn(
                  "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md",
                  assistantValid
                    ? "text-white bg-green-600 hover:bg-green-700"
                    : "text-gray-400 bg-gray-100 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </div>
          {selectedAssistant && (
            <p className="text-sm text-gray-500">
              Using {selectedAssistant.name} with {selectedAssistant.model}
            </p>
          )}
        </div>

        {/* File Upload Section */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop files here, or{' '}
              <label className="text-green-600 hover:text-green-500 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                />
              </label>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported files: PDF, TXT, DOC, DOCX (max 10MB)
            </p>
          </div>
        </div>

        {/* Reference Links Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Reference Links</h3>
            <span className="text-xs text-gray-500">{links.length} links saved</span>
          </div>

          <form onSubmit={handleLinkAdd} className="flex space-x-2">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter a URL"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              Add
            </button>
          </form>

          <div className="space-y-2">
            {links.map((link, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-700 truncate max-w-[80%]"
                >
                  {link}
                </a>
                <button
                  onClick={() => setLinks(links.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Remove link</span>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}