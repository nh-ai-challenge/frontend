import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Search, Heart, MessageCircle, Users, TrendingUp, Award } from 'lucide-react';

interface CommunityItem {
  id: number;
  type: 'story' | 'question' | 'tip' | 'meeting';
  author: {
    name: string;
    avatar: string;
    role: '시니어' | '청년';
  };
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  time: string;
  isLiked?: boolean;
}

interface ChatPreview {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
  sciScore?: number;
}

const CommunityList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'community' | 'messages'>('community');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '성공사례', '질문답변', '농업팁', '모임공지'];

  const communityItems: CommunityItem[] = [
    {
      id: 1,
      type: 'story',
      author: { name: '김영철', avatar: '👨‍🌾', role: '시니어' },
      title: '20년 사과 농사, 이제는 젊은 친구에게 물려주고 싶습니다',
      content: '충주에서 20년간 사과농원을 운영해왔습니다. 이제는 제 노하우를 전수할 젊은 농부를 찾고 있어요...',
      tags: ['사과농장', '충주', '승계희망'],
      likes: 45,
      comments: 12,
      time: '2시간 전',
      isLiked: false
    },
    {
      id: 2,
      type: 'question',
      author: { name: '이준혁', avatar: '👨‍💼', role: '청년' },
      title: '농장 방문 시 준비해야 할 서류가 뭐가 있을까요?',
      content: '다음 주에 첫 농장 방문이 잡혔는데, 어떤 준비를 해가면 좋을지 조언 부탁드립니다.',
      tags: ['농장방문', '준비사항'],
      likes: 23,
      comments: 8,
      time: '3시간 전',
      isLiked: true
    },
    {
      id: 3,
      type: 'tip',
      author: { name: '박서연', avatar: '👩‍🌾', role: '청년' },
      title: '농업 대출 받을 때 꼭 알아야 할 3가지 팁',
      content: 'NH농협에서 청년농 대출 받으면서 알게 된 꿀팁 공유합니다. 첫째, 사업계획서는...',
      tags: ['금융팁', '청년농대출'],
      likes: 67,
      comments: 15,
      time: '어제',
      isLiked: false
    },
    {
      id: 4,
      type: 'meeting',
      author: { name: '정순희', avatar: '👩‍🌾', role: '시니어' },
      title: '충남 천안 포도농장 현장 견학 모임 (1/25)',
      content: '포도 농사에 관심 있는 청년분들 환영합니다. 직접 농장 둘러보고 질문도 받겠습니다.',
      tags: ['현장견학', '포도농장', '천안'],
      likes: 34,
      comments: 19,
      time: '2일 전',
      isLiked: false
    }
  ];

  const chatPreviews: ChatPreview[] = [
    {
      id: 1,
      name: '이준혁',
      avatar: '👨‍🌾',
      lastMessage: '네, 1월 20일에 방문하겠습니다!',
      time: '방금',
      unread: 2,
      isOnline: true,
      sciScore: 97
    },
    {
      id: 2,
      name: '박서연',
      avatar: '👩‍🌾',
      lastMessage: '농장 사진 보내드릴게요',
      time: '10분 전',
      unread: 0,
      isOnline: true,
      sciScore: 92
    },
    {
      id: 3,
      name: '김민수',
      avatar: '👨‍💼',
      lastMessage: '안녕하세요, 프로필 잘 봤습니다',
      time: '1시간 전',
      unread: 1,
      isOnline: false,
      sciScore: 85
    },
    {
      id: 4,
      name: 'NH 상담사',
      avatar: '🏦',
      lastMessage: '농장 승계 관련 상담 일정을 잡아드리겠습니다',
      time: '어제',
      unread: 0,
      isOnline: false
    }
  ];

  const getTypeIcon = (type: CommunityItem['type']) => {
    switch (type) {
      case 'story': return '📖';
      case 'question': return '❓';
      case 'tip': return '💡';
      case 'meeting': return '📅';
      default: return '📝';
    }
  };

  const getTypeColor = (type: CommunityItem['type']) => {
    switch (type) {
      case 'story': return 'bg-blue-100 text-blue-700';
      case 'question': return 'bg-purple-100 text-purple-700';
      case 'tip': return 'bg-green-100 text-green-700';
      case 'meeting': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <h1 className="text-lg font-bold">커뮤니티</h1>
        <button className="p-2">
          <Search size={20} />
        </button>
      </header>

      {/* Tab Navigation */}
      <div className="fixed top-14 left-0 right-0 bg-white border-b border-gray-100 z-40">
        <div className="flex">
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-3 text-center font-semibold transition-all ${
              activeTab === 'community'
                ? 'text-[#00984f] border-b-2 border-[#00984f]'
                : 'text-gray-500'
            }`}
          >
            <MessageSquare size={18} className="inline mr-2" />
            게시판
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-3 text-center font-semibold transition-all relative ${
              activeTab === 'messages'
                ? 'text-[#00984f] border-b-2 border-[#00984f]'
                : 'text-gray-500'
            }`}
          >
            <MessageCircle size={18} className="inline mr-2" />
            메시지
            {chatPreviews.some(chat => chat.unread) && (
              <span className="absolute top-2 right-[calc(50%-40px)] w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="pt-[104px] pb-20">
        {activeTab === 'community' ? (
          <>
            {/* Category Filter */}
            <div className="px-4 py-3 bg-white border-b border-gray-100">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-[#00984f] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Community Posts */}
            <div className="px-4 py-4 space-y-3">
              {communityItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/community/post/${item.id}`)}
                  className="bg-white rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                      {item.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{item.author.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          item.author.role === '시니어' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.author.role}
                        </span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${getTypeColor(item.type)}`}>
                          <span>{getTypeIcon(item.type)}</span>
                          {item.type === 'story' ? '경험담' : item.type === 'question' ? '질문' : item.type === 'tip' ? '팁' : '모임'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.content}</p>

                  <div className="flex items-center gap-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle like
                      }}
                      className={`flex items-center gap-1 ${item.isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart size={16} fill={item.isLiked ? 'currentColor' : 'none'} />
                      {item.likes}
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      {item.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Write Button */}
            <button 
              onClick={() => navigate('/community/write')}
              className="fixed bottom-24 right-4 w-14 h-14 bg-[#00984f] rounded-full flex items-center justify-center text-white shadow-lg"
            >
              <span className="text-2xl">+</span>
            </button>
          </>
        ) : (
          /* Messages Tab */
          <div className="px-4 py-4">
            {/* Active Matches Banner */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <TrendingUp size={20} className="text-[#00984f]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">진행 중인 매칭</p>
                  <p className="text-xs text-gray-600">3명과 대화 중</p>
                </div>
              </div>
              <Award className="text-[#00984f]" size={24} />
            </div>

            {/* Chat List */}
            <div className="space-y-3">
              {chatPreviews.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => navigate(`/community/chat/${chat.id}`)}
                  className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                      {chat.avatar}
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{chat.name}</span>
                        {chat.sciScore && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            SCI {chat.sciScore}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>

                  {chat.unread && chat.unread > 0 && (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{chat.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityList;