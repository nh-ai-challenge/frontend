import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  ChevronRight, 
  MessageSquare,
  Home,
  Search as SearchIcon,
  FileText,
  User,
  TrendingUp,
  MapPin,
  Clock,
  Check,
  BarChart3,
  Building,
  DollarSign
} from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  age: number;
  avatar: string;
  location: string;
  experience: string;
  sciScore: number;
  matchType?: 'best' | 'good' | 'possible';
  matchingPoints: {
    philosophy: number;
    mentorship: number;
    financial: number;
  };
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const persona = location.state?.persona || '장인적 계승가';
  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: '이준혁',
      age: 32,
      avatar: '👨‍🌾',
      location: '충북 거주',
      experience: '5년 경력',
      sciScore: 97,
      matchType: 'best',
      matchingPoints: {
        philosophy: 100,
        mentorship: 95,
        financial: 90
      }
    },
    {
      id: 2,
      name: '박서연',
      age: 28,
      avatar: '👩‍🌾',
      location: '서울 거주',
      experience: '귀농 준비',
      sciScore: 92,
      matchType: 'good',
      matchingPoints: {
        philosophy: 88,
        mentorship: 92,
        financial: 95
      }
    },
    {
      id: 3,
      name: '김민수',
      age: 35,
      avatar: '👨‍🌾',
      location: '충북 거주',
      experience: '경영 경험',
      sciScore: 85,
      matchType: 'possible',
      matchingPoints: {
        philosophy: 82,
        mentorship: 85,
        financial: 88
      }
    }
  ]);

  const [progressConversations] = useState([
    { id: 1, name: '이준혁', status: '농장 방문 일정 조율 중', time: '2시간 전', avatar: '👨‍🌾' },
    { id: 2, name: '박서연', status: '첫 인사 메시지', time: '어제', avatar: '👩‍🌾' }
  ]);

  const getPersonaInfo = () => {
    const personas = {
      '장인적 계승가': {
        icon: '🌟',
        desc: '전통과 품질을 중시하며\n노하우를 전수할 성실한 후계자를 찾는 농장주',
        tags: ['품질우선', '전통계승', '멘토링희망', '안정추구']
      },
      '경험적 사업가': {
        icon: '💼',
        desc: '경험과 수완으로 사업을 확장하며\n실용적 가치를 추구하는 농장주',
        tags: ['사업수완', '실용주의', '확장성', '네트워크']
      },
      '데이터 기반 장인': {
        icon: '📊',
        desc: '기술과 데이터로 품질을 극대화하며\n스마트한 농업을 추구하는 농장주',
        tags: ['정밀농업', '데이터활용', '품질극대화', '기술혁신']
      },
      '혁신적 경영가': {
        icon: '🚀',
        desc: '첨단 기술로 미래 농업을 선도하며\n수익 극대화를 추구하는 농장주',
        tags: ['기술혁신', '수익극대화', '성장추구', '글로벌']
      }
    };
    return personas[persona] || personas['장인적 계승가'];
  };

  const personaInfo = getPersonaInfo();

  const calculateStrokeDashoffset = (score: number) => {
    const circumference = 2 * Math.PI * 28;
    return circumference - (score / 100) * circumference;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const circles = document.querySelectorAll('.score-fill');
      circles.forEach((circle: any) => {
        const offset = circle.getAttribute('data-offset');
        if (offset) {
          circle.style.strokeDashoffset = offset;
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const quickMenuItems = [
    { icon: <MessageSquare size={24} />, label: '메시지', path: '/messages' },
    { icon: <BarChart3 size={24} />, label: '가치평가', path: '/senior/value-check' },
    { icon: <Building size={24} />, label: '농지연금', path: '/finance/farmland-pension' },
    { icon: <FileText size={24} />, label: '계약관리', path: '/contracts' }
  ];


  return (
    <div className="min-h-screen bg-gray-50 pb-[70px]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-semibold">
            김
          </div>
          <div>
            <div className="text-base font-semibold">김영철님</div>
            <div className="text-xs text-[#00984f] font-medium">{personaInfo.icon} {persona}</div>
          </div>
        </div>
        <button className="relative p-2">
          <Bell size={24} className="text-gray-600" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-14">
        {/* Farm Summary */}
        <section className="bg-gradient-to-br from-[#00984f] to-[#00c968] px-5 pt-6 pb-8 text-white">
          <p className="text-sm opacity-90 mb-2">충북 충주시 사과로 123</p>
          <h1 className="text-2xl font-bold mb-5">김영철의 사과농원</h1>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white/15 backdrop-blur rounded-xl">
            <div className="text-center">
              <div className="text-xl font-bold">4.2억</div>
              <div className="text-xs opacity-90">농장 가치</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">3.5ha</div>
              <div className="text-xs opacity-90">농장 면적</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">20년</div>
              <div className="text-xs opacity-90">운영 경력</div>
            </div>
          </div>
        </section>

        {/* AI Matching Alert */}
        <div 
          className="mx-5 -mt-4 mb-5 bg-white rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer"
          onClick={() => document.getElementById('candidates')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00984f] via-[#00c968] to-[#00984f] animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-2xl animate-pulse">
              🎯
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#00984f]">AI가 찾은 맞춤 후계자 3명</h3>
              <p className="text-sm text-gray-600">농장님과 가장 잘 맞는 청년들입니다</p>
            </div>
            <ChevronRight size={20} className="text-[#00984f]" />
          </div>
        </div>

        {/* Persona Card */}
        <section className="px-5 mb-5">
          <div className="bg-white rounded-2xl p-5 text-center">
            <span className="inline-block bg-green-50 text-[#00984f] px-3 py-1 rounded-full text-xs font-semibold mb-3">
              AI 페르소나 분석 완료
            </span>
            <div className="text-2xl font-bold mb-2">{personaInfo.icon} {persona}</div>
            <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{personaInfo.desc}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {personaInfo.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommended Candidates */}
        <section id="candidates" className="px-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">AI 추천 후계자</h2>
            <button 
              onClick={() => navigate('/matching/list')}
              className="text-sm text-[#00984f] font-semibold"
            >
              전체보기
            </button>
          </div>

          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-2xl p-4 mb-3 relative">
              {candidate.matchType === 'best' && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white px-2 py-1 rounded text-[11px] font-semibold">
                  최고 매칭
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  {candidate.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold">{candidate.name} ({candidate.age}세)</div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {candidate.location}
                    </span>
                    <span>🌾 {candidate.experience}</span>
                  </div>
                </div>
              </div>

              {/* SCI Score */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-3">
                <div className="relative w-16 h-16">
                  <svg width="64" height="64" className="transform -rotate-90">
                    <defs>
                      <linearGradient id={`gradient-${candidate.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00984f" />
                        <stop offset="100%" stopColor="#00c968" />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e8ebed" strokeWidth="6" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke={`url(#gradient-${candidate.id})`}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={176}
                      className="score-fill transition-all duration-1000"
                      data-offset={calculateStrokeDashoffset(candidate.sciScore)}
                      style={{ strokeDashoffset: 176 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#00984f]">
                    {candidate.sciScore}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">SCI 승계 궁합 지수</div>
                  <div className="text-xs text-gray-600">
                    {candidate.matchType === 'best' 
                      ? '농장님과 가장 잘 맞는 후계자입니다'
                      : candidate.matchType === 'good'
                      ? '시너지가 기대되는 매칭입니다'
                      : '보완이 필요하지만 가능성 있는 매칭'}
                  </div>
                </div>
              </div>

              {/* Matching Points (only for best match) */}
              {candidate.matchType === 'best' && (
                <div className="p-3 bg-green-50 rounded-xl mb-3">
                  <div className="text-xs font-semibold text-[#00984f] mb-2">💚 높은 궁합 포인트</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Check size={14} className="text-[#00984f]" />
                      <span>농업 철학: 품질과 전통 중시 ({candidate.matchingPoints.philosophy}점)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Check size={14} className="text-[#00984f]" />
                      <span>멘토링: 적극적으로 배우려는 의지 ({candidate.matchingPoints.mentorship}점)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Check size={14} className="text-[#00984f]" />
                      <span>재무 조건: 안정적 운영 선호 ({candidate.matchingPoints.financial}점)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/matching/profile/${candidate.id}`)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-lg font-semibold text-sm"
                >
                  프로필 보기
                </button>
                <button 
                  onClick={() => navigate('/messages')}
                  className="flex-1 py-2.5 bg-white border-2 border-[#00984f] text-[#00984f] rounded-lg font-semibold text-sm"
                >
                  메시지 보내기
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Quick Menu */}
        <section className="px-5 mb-5">
          <h2 className="text-lg font-bold mb-4">자주 쓰는 기능</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-xl py-4 flex flex-col items-center gap-2"
              >
                <div className="text-[#00984f]">{item.icon}</div>
                <span className="text-xs text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Progress Conversations */}
        <section className="px-5 mb-5">
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">진행 중인 대화</h3>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                {progressConversations.length}건
              </span>
            </div>
            {progressConversations.map((convo, index) => (
              <div 
                key={convo.id} 
                className={`flex items-center gap-3 py-3 ${
                  index < progressConversations.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {convo.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{convo.name}</div>
                  <div className="text-xs text-gray-600">{convo.status}</div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {convo.time}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;