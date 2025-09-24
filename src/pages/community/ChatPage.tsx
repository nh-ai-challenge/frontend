import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  MoreVertical,
  Paperclip,
  Send,
  Check,
  Shield,
  Calendar,
  MapPin,
  FileText,
  Camera
} from 'lucide-react';

interface Message {
  id: number;
  type: 'sent' | 'received' | 'system';
  content: string;
  time: string;
  isRead?: boolean;
  card?: {
    type: 'profile' | 'schedule' | 'document';
    data: any;
  };
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'system',
      content: '이준혁님과의 대화가 시작되었습니다.\nSCI 궁합 지수 97점으로 매우 높은 매칭입니다.',
      time: '2025년 1월 15일'
    },
    {
      id: 2,
      type: 'received',
      content: '안녕하세요, 김영철 선배님!\n프로필을 보고 연락드립니다. 선배님의 농장과 철학에 깊은 감명을 받았습니다.',
      time: '오후 2:30',
      isRead: true
    },
    {
      id: 3,
      type: 'sent',
      content: '네, 안녕하세요 이준혁님.\n프로필 잘 봤습니다. 5년 경력이 있으시네요.',
      time: '오후 2:35',
      isRead: true
    },
    {
      id: 4,
      type: 'received',
      content: '네, 충주 지역 사과 농장에서 일했습니다. 제 경력을 간단히 정리해드릴게요.',
      time: '오후 2:40',
      isRead: true,
      card: {
        type: 'profile',
        data: {
          title: '이준혁 경력 요약',
          items: [
            { icon: '🌾', label: '사과 재배 5년' },
            { icon: '🎓', label: '농대 졸업' },
            { icon: '📍', label: '충북 거주' },
            { icon: '🏆', label: '품질인증 보유' }
          ]
        }
      }
    },
    {
      id: 5,
      type: 'sent',
      content: '경력이 탄탄하시네요. 한번 농장에 방문해보시겠어요?',
      time: '오후 2:45',
      isRead: true
    },
    {
      id: 6,
      type: 'received',
      content: '네, 꼭 방문하고 싶습니다! 가능한 날짜를 말씀해주시면 제가 맞춰서 방문하겠습니다.',
      time: '오후 2:50',
      isRead: true,
      card: {
        type: 'schedule',
        data: {
          title: '방문 가능 일정',
          options: [
            '1월 20일 (월) 오후 2시',
            '1월 22일 (수) 오전 10시',
            '1월 25일 (토) 오후 3시'
          ]
        }
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [suggestions] = useState([
    '좋습니다. 1월 20일에 뵙겠습니다',
    '농장 주소를 알려주세요',
    '준비해올 것이 있을까요?',
    '사업 계획서를 가져오세요'
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatUser = {
    name: '이준혁',
    avatar: '👨‍🌾',
    status: '온라인',
    sciScore: 97
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'sent',
      content: inputMessage,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isRead: false
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate typing
    setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        simulateReply();
      }, 2000);
    }, 1000);
  };

  const simulateReply = () => {
    const replies = [
      '네, 알겠습니다!',
      '좋은 생각이네요.',
      '꼭 그렇게 하겠습니다.',
      '감사합니다, 선배님.'
    ];
    
    const reply: Message = {
      id: messages.length + 2,
      type: 'received',
      content: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isRead: false
    };

    setMessages(prev => [...prev, reply]);
  };

  const handleSuggestion = (text: string) => {
    setInputMessage(text);
    textareaRef.current?.focus();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white flex items-center justify-between px-2 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <div 
            onClick={() => navigate(`/matching/profile/${id}`)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl relative">
              {chatUser.avatar}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-base font-semibold">{chatUser.name}</p>
              <p className="text-xs text-green-600">{chatUser.status}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 hover:bg-gray-100 rounded-full">
            <Phone size={20} />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-full">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Matching Info Bar */}
      <div 
        onClick={() => navigate(`/matching/profile/${id}`)}
        className="fixed top-[60px] left-0 right-0 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-3 flex items-center justify-between z-40 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-[#00984f]">
          <span className="text-lg">🎯</span>
          <span>SCI 매칭 지수</span>
          <span className="bg-[#00984f] text-white px-2 py-0.5 rounded-lg text-xs">
            {chatUser.sciScore}점
          </span>
        </div>
        <span className="text-xs text-[#00984f]">상세보기 ›</span>
      </div>

      {/* Messages */}
      <main className="flex-1 pt-[116px] pb-[140px] px-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4 py-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' ? (
                <div className="text-center my-4">
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 inline-block">
                    <div className="text-2xl mb-2">🤝</div>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${message.type === 'sent' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl ${
                      message.type === 'sent' 
                        ? 'bg-[#00984f] text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}>
                      <p className="text-[15px] whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Card attachments */}
                    {message.card && message.card.type === 'profile' && (
                      <div className="bg-white rounded-xl p-4 mt-2 border border-gray-200">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          📋 {message.card.data.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {message.card.data.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-xs text-gray-600">{item.label}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-3 py-2 bg-green-50 text-[#00984f] rounded-lg text-sm font-semibold">
                          상세 이력서 보기
                        </button>
                      </div>
                    )}

                    {message.card && message.card.type === 'schedule' && (
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mt-2">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          📅 {message.card.data.title}
                        </h4>
                        <div className="space-y-2">
                          {message.card.data.options.map((option: string, index: number) => (
                            <button 
                              key={index}
                              className="w-full p-2.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-[#00984f] hover:text-white transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                      message.type === 'sent' ? 'justify-end' : ''
                    }`}>
                      <span>{message.time}</span>
                      {message.type === 'sent' && message.isRead && (
                        <span className="text-[#00984f]">읽음</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {showTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Suggestions */}
      <div className="fixed bottom-[80px] left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-30">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestion(suggestion)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap hover:bg-[#00984f] hover:text-white hover:border-[#00984f] transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="px-4 py-2 bg-orange-50 flex items-center gap-2">
          <Shield size={16} className="text-orange-600" />
          <span className="text-xs text-orange-700">NH농협이 보호하는 안전한 대화입니다</span>
        </div>
        <div className="flex items-end gap-2 p-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} className="text-gray-600" />
          </button>
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요"
            className="flex-1 min-h-[36px] max-h-[100px] px-4 py-2 bg-gray-50 border border-gray-200 rounded-3xl resize-none outline-none focus:border-[#00984f] focus:bg-white transition-colors"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className={`p-2 rounded-full transition-all ${
              inputMessage.trim() 
                ? 'bg-[#00984f] hover:bg-[#00773d]' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;