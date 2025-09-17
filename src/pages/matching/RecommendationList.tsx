import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Check,
  MessageSquare,
  MapPin,
  GraduationCap,
  Award,
  X,
  Filter,
  ChevronDown
} from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  age: number;
  avatar: string;
  location: string;
  experience: string;
  education?: string;
  award?: string;
  sciScore: number;
  matchType: 'perfect' | 'synergy' | 'possible';
  dimensions: {
    philosophy: number;
    business: number;
    mentorship: number;
    finance: number;
  };
  intro: string;
  tags: string[];
}

const RecommendationList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['전체']);
  const [sortBy, setSortBy] = useState('sci');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    sciScore: '',
    location: '',
    experience: '',
    persona: ''
  });

  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: '이준혁',
      age: 32,
      avatar: '👨‍🌾',
      location: '충북 충주',
      experience: '5년 경력',
      education: '농대 졸업',
      sciScore: 97,
      matchType: 'perfect',
      dimensions: {
        philosophy: 100,
        business: 95,
        mentorship: 95,
        finance: 90
      },
      intro: '품질과 전통을 중시하는 농업 철학을 가지고 있습니다. 선배님의 노하우를 배워 더 발전시키고 싶습니다.',
      tags: ['충북 충주', '5년 경력', '농대 졸업']
    },
    {
      id: 2,
      name: '김민준',
      age: 35,
      avatar: '👨‍🌾',
      location: '충북 청주',
      experience: '8년 경력',
      award: '청년농부상',
      sciScore: 95,
      matchType: 'perfect',
      dimensions: {
        philosophy: 95,
        business: 92,
        mentorship: 98,
        finance: 88
      },
      intro: '지속가능한 농업을 추구하며, 품질 향상을 위해 끊임없이 연구합니다.',
      tags: ['충북 청주', '8년 경력', '청년농부상']
    },
    {
      id: 3,
      name: '박서연',
      age: 28,
      avatar: '👩‍🌾',
      location: '서울',
      experience: '귀농 준비',
      education: 'IT 경험',
      sciScore: 92,
      matchType: 'synergy',
      dimensions: {
        philosophy: 85,
        business: 90,
        mentorship: 100,
        finance: 88
      },
      intro: 'IT 기술을 활용해 전통 농업의 가치를 높이고 싶습니다. 선배님께 많이 배우고 싶습니다.',
      tags: ['서울', '귀농 준비', 'IT 경험']
    },
    {
      id: 4,
      name: '정현우',
      age: 30,
      avatar: '👨‍🌾',
      location: '경기 이천',
      experience: '3년 경력',
      sciScore: 88,
      matchType: 'synergy',
      dimensions: {
        philosophy: 82,
        business: 85,
        mentorship: 92,
        finance: 85
      },
      intro: '유기농법을 전문으로 하며, 친환경 농업에 열정이 있습니다.',
      tags: ['경기 이천', '3년 경력', '유기농 전문']
    },
    {
      id: 5,
      name: '김민수',
      age: 35,
      avatar: '👨‍🌾',
      location: '충북 거주',
      experience: '경영 경험',
      sciScore: 85,
      matchType: 'possible',
      dimensions: {
        philosophy: 82,
        business: 85,
        mentorship: 85,
        finance: 88
      },
      intro: '농장 경영 효율화와 수익 개선에 관심이 많습니다.',
      tags: ['충북 거주', '경영 경험', '효율화 전문']
    }
  ]);

  const perfectMatches = candidates.filter(c => c.matchType === 'perfect');
  const synergyMatches = candidates.filter(c => c.matchType === 'synergy');
  const possibleMatches = candidates.filter(c => c.matchType === 'possible');

  useEffect(() => {
    const timer = setTimeout(() => {
      const fills = document.querySelectorAll('.sci-fill');
      fills.forEach((fill: any, index) => {
        const width = fill.getAttribute('data-width');
        if (width) {
          setTimeout(() => {
            fill.style.width = width;
          }, index * 100);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const toggleFilter = (filter: string) => {
    if (filter === '전체') {
      setSelectedFilters(['전체']);
    } else {
      const newFilters = selectedFilters.filter(f => f !== '전체');
      if (selectedFilters.includes(filter)) {
        const updated = newFilters.filter(f => f !== filter);
        setSelectedFilters(updated.length === 0 ? ['전체'] : updated);
      } else {
        setSelectedFilters([...newFilters, filter]);
      }
    }
  };

  const getMatchBadgeStyle = (type: string) => {
    switch(type) {
      case 'perfect':
        return 'bg-gradient-to-r from-[#00984f] to-[#00c968] text-white';
      case 'synergy':
        return 'bg-green-100 text-[#00984f]';
      case 'possible':
        return 'bg-orange-100 text-orange-600';
      default:
        return '';
    }
  };

  const getMatchBadgeText = (type: string) => {
    switch(type) {
      case 'perfect':
        return 'Perfect Match';
      case 'synergy':
        return 'Synergy';
      case 'possible':
        return 'Possible';
      default:
        return '';
    }
  };

  const renderCandidateCard = (candidate: Candidate) => (
    <div 
      key={candidate.id}
      className="bg-white rounded-2xl p-4 mb-3 relative cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/matching/profile/${candidate.id}`)}
    >
      <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-[11px] font-semibold ${getMatchBadgeStyle(candidate.matchType)}`}>
        {getMatchBadgeText(candidate.matchType)}
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
          {candidate.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold">{candidate.name} ({candidate.age}세)</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {candidate.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                {index === 0 && <MapPin size={10} />}
                {index === 1 && '🌾'}
                {index === 2 && (candidate.award ? '🏆' : candidate.education === 'IT 경험' ? '💡' : '🎓')}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-600">SCI 승계 궁합 지수</span>
          <span className="text-lg font-bold text-[#00984f]">{candidate.sciScore}점</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] rounded-full sci-fill transition-all duration-700 ease-out"
            data-width={`${candidate.sciScore}%`}
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {candidate.matchType !== 'possible' && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg">
            <span className="text-sm">💭</span>
            <span className="text-xs text-gray-600 flex-1">농업 철학</span>
            <span className="text-xs font-semibold text-[#00984f]">{candidate.dimensions.philosophy}점</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg">
            <span className="text-sm">📈</span>
            <span className="text-xs text-gray-600 flex-1">사업 방식</span>
            <span className="text-xs font-semibold text-[#00984f]">{candidate.dimensions.business}점</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg">
            <span className="text-sm">🤝</span>
            <span className="text-xs text-gray-600 flex-1">멘토십</span>
            <span className="text-xs font-semibold text-[#00984f]">{candidate.dimensions.mentorship}점</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg">
            <span className="text-sm">💰</span>
            <span className="text-xs text-gray-600 flex-1">재무 조건</span>
            <span className="text-xs font-semibold text-[#00984f]">{candidate.dimensions.finance}점</span>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 mb-3 line-clamp-2">
        "{candidate.intro}"
      </div>

      <div className="flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/matching/profile/${candidate.id}`);
          }}
          className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm flex items-center justify-center"
        >
          상세 프로필
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/messages');
          }}
          className="flex-1 py-2.5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-1"
        >
          <MessageSquare size={16} />
          메시지
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">AI 추천 후계자</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search size={20} className="text-gray-600" />
        </button>
      </header>

      <main className="pt-14">
        {/* Summary Banner */}
        <section className="bg-gradient-to-br from-[#00984f] to-[#00c968] p-5 text-white">
          <p className="text-sm opacity-90 mb-2">김영철님을 위한</p>
          <h2 className="text-2xl font-bold mb-4">AI 맞춤 후계자 12명</h2>
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-base">
                🎯
              </div>
              <div>
                <div className="text-lg font-semibold">{perfectMatches.length}명</div>
                <div className="text-xs opacity-90">완벽 매칭</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-base">
                🤝
              </div>
              <div>
                <div className="text-lg font-semibold">{synergyMatches.length}명</div>
                <div className="text-xs opacity-90">시너지 기대</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-base">
                💬
              </div>
              <div>
                <div className="text-lg font-semibold">{possibleMatches.length}명</div>
                <div className="text-xs opacity-90">대화 가능</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-14 bg-white p-4 border-b border-gray-100 z-40">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            <button
              onClick={() => toggleFilter('전체')}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                selectedFilters.includes('전체')
                  ? 'bg-[#00984f] text-white border-[#00984f]'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {selectedFilters.includes('전체') && <Check size={12} />}
              전체
            </button>
            <button
              onClick={() => toggleFilter('90점 이상')}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${
                selectedFilters.includes('90점 이상')
                  ? 'bg-[#00984f] text-white border-[#00984f]'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              90점 이상
            </button>
            <button
              onClick={() => toggleFilter('충북 지역')}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${
                selectedFilters.includes('충북 지역')
                  ? 'bg-[#00984f] text-white border-[#00984f]'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              충북 지역
            </button>
            <button
              onClick={() => toggleFilter('경력 5년↑')}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${
                selectedFilters.includes('경력 5년↑')
                  ? 'bg-[#00984f] text-white border-[#00984f]'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              경력 5년↑
            </button>
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-4 py-2 rounded-full border bg-white text-gray-600 border-gray-300 text-sm font-medium whitespace-nowrap flex items-center gap-1"
            >
              <Filter size={14} />
              필터
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">총 {candidates.length}명의 후계자</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700"
            >
              <option value="sci">SCI 점수 높은순</option>
              <option value="recent">최신 등록순</option>
              <option value="age">나이 적은순</option>
              <option value="experience">경력 많은순</option>
            </select>
          </div>
        </section>

        {/* Perfect Matches */}
        {perfectMatches.length > 0 && (
          <section className="px-5 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-50 text-[#00984f] px-3 py-1.5 rounded-lg text-xs font-semibold">
                🎯 완벽한 매칭
              </span>
              <span className="text-xs text-gray-600">페르소나가 일치합니다</span>
            </div>
            {perfectMatches.map(renderCandidateCard)}
          </section>
        )}

        {/* Synergy Matches */}
        {synergyMatches.length > 0 && (
          <section className="px-5 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-50 text-[#00984f] px-3 py-1.5 rounded-lg text-xs font-semibold">
                🤝 시너지 기대
              </span>
              <span className="text-xs text-gray-600">보완적 관계 가능</span>
            </div>
            {synergyMatches.map(renderCandidateCard)}
          </section>
        )}

        {/* Possible Matches */}
        {possibleMatches.length > 0 && (
          <section className="px-5 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                💬 대화 가능
              </span>
              <span className="text-xs text-gray-600">추가 논의 필요</span>
            </div>
            {possibleMatches.map(renderCandidateCard)}
          </section>
        )}

        {/* Load More */}
        <div className="p-5 text-center">
          <button className="px-8 py-3 bg-white border-2 border-[#00984f] text-[#00984f] rounded-xl font-semibold">
            더 많은 후계자 보기
          </button>
        </div>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">상세 필터</h2>
              <button onClick={() => setShowFilterModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">SCI 점수</h3>
              <div className="flex flex-wrap gap-2">
                {['90점 이상', '80-90점', '70-80점', '전체'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterOptions({...filterOptions, sciScore: option})}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium ${
                      filterOptions.sciScore === option
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">지역</h3>
              <div className="flex flex-wrap gap-2">
                {['충북', '충남', '경기', '강원', '전체'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterOptions({...filterOptions, location: option})}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium ${
                      filterOptions.location === option
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">경력</h3>
              <div className="flex flex-wrap gap-2">
                {['10년 이상', '5-10년', '1-5년', '신규'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterOptions({...filterOptions, experience: option})}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium ${
                      filterOptions.experience === option
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">페르소나</h3>
              <div className="flex flex-wrap gap-2">
                {['장인적 계승가', '혁신적 경영가', '데이터 기반 장인', '경험적 사업가'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterOptions({...filterOptions, persona: option})}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium ${
                      filterOptions.persona === option
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowFilterModal(false)}
              className="w-full py-3.5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold"
            >
              필터 적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationList;