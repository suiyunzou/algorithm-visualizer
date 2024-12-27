import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiKey, FiSettings, FiCopy, FiCheck } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConfigService from '../../services/configService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinking?: string[];
  id: string;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  isNew?: boolean;
  maxTokens?: number;
}

interface AIProvider {
  id: string;
  name: string;
  apiEndpoint: string;
  requiresKey: boolean;
  models: AIModel[];
}

const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    requiresKey: true,
    models: [
      { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
      { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 Turbo 16K', provider: 'openai' }
    ]
  },
  {
    id: 'google',
    name: 'Google AI',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    requiresKey: true,
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Experimental', provider: 'google', isNew: true },
      { id: 'gemini-exp-1206', name: 'Gemini Experimental 1206', provider: 'google', isNew: true },
      { id: 'gemini-2.0-flash-thinking-exp-1219', name: 'Gemini 2.0 Flash Thinking Experimental', provider: 'google', isNew: true },
      { id: 'learnlm-1.5-pro-experimental', name: 'LearnLM 1.5 Pro Experimental', provider: 'google' },
      { id: 'gemini-pro', name: 'Gemini Pro', provider: 'google' }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    requiresKey: true,
    models: [
      { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'claude' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'claude' },
      { id: 'claude-2.1', name: 'Claude 2.1', provider: 'claude' },
      { id: 'claude-instant', name: 'Claude Instant', provider: 'claude' }
    ]
  }
];

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AI_PROVIDERS[0]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_PROVIDERS[0].models[0]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showKeyPrompt, setShowKeyPrompt] = useState(true);  
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const configService = ConfigService.getInstance();

  useEffect(() => {
    setSelectedModel(selectedProvider.models[0]);
  }, [selectedProvider]);

  const handleApiKeySave = () => {
    if (apiKey.trim()) {
      configService.setApiKey(selectedProvider.id, apiKey);
      setIsConfigOpen(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleGoogleAIResponse = (data: any): Message => {
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      thinking: [],
      id: Date.now().toString()
    };

    if (selectedModel.id === 'gemini-2.0-flash-thinking-exp-1219') {
      if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts) {
          // 收集思考过程并转换为Markdown格式
          assistantMessage.thinking = candidate.content.parts
            .filter((part: any) => part.text && part.text.startsWith('Thinking:'))
            .map((part: any) => part.text.replace('Thinking:', '').trim());
          
          // 获取最终答案
          const finalAnswer = candidate.content.parts
            .find((part: any) => part.text && !part.text.startsWith('Thinking:'));
          
          if (finalAnswer) {
            assistantMessage.content = finalAnswer.text;
          }
        }
      }
    } else {
      if (data.candidates && data.candidates[0]) {
        assistantMessage.content = data.candidates[0].content.parts[0].text;
      }
    }

    return assistantMessage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentKey = configService.getApiKey(selectedProvider.id);
    if (!currentKey) {
      setIsConfigOpen(true);
      return;
    }

    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      id: Date.now().toString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      let response;
      switch (selectedProvider.id) {
        case 'openai':
          response = await fetch(selectedProvider.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentKey}`
            },
            body: JSON.stringify({
              model: selectedModel.id,
              messages: [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content
              }))
            })
          });
          const openAIData = await response.json();
          if (openAIData.choices && openAIData.choices[0]) {
            const assistantMessage: Message = {
              role: 'assistant',
              content: openAIData.choices[0].message.content,
              id: Date.now().toString()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }
          break;

        case 'google':
          response = await fetch(`${selectedProvider.apiEndpoint}/${selectedModel.id}:generateContent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': currentKey
            },
            body: JSON.stringify({
              contents: [...messages, userMessage].map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{
                  text: msg.content
                }]
              }))
            })
          });
          const googleData = await response.json();
          const assistantMessage = handleGoogleAIResponse(googleData);
          setMessages(prev => [...prev, assistantMessage]);
          break;

        case 'claude':
          response = await fetch(selectedProvider.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': currentKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: selectedModel.id,
              messages: [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content
              }))
            })
          });
          const claudeData = await response.json();
          if (claudeData.content) {
            const assistantMessage: Message = {
              role: 'assistant',
              content: claudeData.content,
              id: Date.now().toString()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，请求失败。请检查你的API密钥和网络连接。',
        id: Date.now().toString()
      }]);
    }
  };

  const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
    return (
      <div className="relative group">
        {message.thinking && message.thinking.length > 0 && (
          <div className="mb-4 text-gray-600">
            <div className="font-semibold mb-2">思考过程：</div>
            {message.thinking.map((thought, i) => (
              <div key={i} className="mb-2 pl-4 border-l-2 border-gray-300">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {thought}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        )}
        <div className={message.thinking ? 'pt-4 border-t border-gray-200' : ''}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <button
          onClick={() => handleCopy(message.content, message.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copiedMessageId === message.id ? (
            <FiCheck className="text-green-500" />
          ) : (
            <FiCopy className="text-gray-500 hover:text-gray-700" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">AI 助手</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              className="border rounded-md px-2 py-1"
              value={selectedProvider.id}
              onChange={(e) => {
                const provider = AI_PROVIDERS.find(p => p.id === e.target.value);
                if (provider) setSelectedProvider(provider);
              }}
            >
              {AI_PROVIDERS.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <select
              className="border rounded-md px-2 py-1"
              value={selectedModel.id}
              onChange={(e) => {
                const model = selectedProvider.models.find(m => m.id === e.target.value);
                if (model) setSelectedModel(model);
              }}
            >
              {selectedProvider.models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="设置 API 密钥"
          >
            <FiSettings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="w-32 h-32 mb-8">
              <img 
                src="/robot.svg" 
                alt="AI Assistant" 
                className="w-full h-full opacity-50"
              />
            </div>
            <h2 className="text-xl font-semibold mb-4">欢迎使用 AI 助手</h2>
            <div className="text-center max-w-md">
              <p className="mb-4">
                我是您的智能助手，可以帮助您：
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  回答您的算法和数据结构问题
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  解释代码的工作原理
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  提供编程建议和最佳实践
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  帮助调试和优化代码
                </li>
              </ul>
              <p className="text-sm">
                在下方输入框中输入您的问题，开始对话吧！
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] p-4 rounded-lg relative ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.thinking && message.thinking.length > 0 && (
                    <div className="mb-2 text-sm opacity-80 border-b pb-2">
                      <div className="font-semibold mb-1">思考过程：</div>
                      {message.thinking.map((thought, index) => (
                        <div key={index} className="ml-2">• {thought}</div>
                      ))}
                    </div>
                  )}
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
                    title="复制内容"
                  >
                    {copiedMessageId === message.id ? (
                      <FiCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <FiCopy className="w-4 h-4 opacity-50 hover:opacity-100" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
            disabled={!configService.getApiKey(selectedProvider.id)}
          >
            <FiSend />
            发送
          </button>
        </form>
      </div>

      {/* API Key Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">设置 API 密钥</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedProvider.name} API 密钥
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`请输入您的 ${selectedProvider.name} API 密钥`}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfigOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleApiKeySave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Prompt */}
      {showKeyPrompt && !configService.getApiKey(selectedProvider.id) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-40" onClick={() => setShowKeyPrompt(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">欢迎使用 AI 助手</h3>
            <p className="text-gray-600 mb-4">
              请点击右上角设置按钮，输入您的 API 密钥以开始使用。
              <br />
              <span className="text-sm">（点击任意位置关闭此提示）</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
