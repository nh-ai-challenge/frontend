import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MoreVertical,
  MapPin,
  GraduationCap,
  Briefcase,
  User,
  MessageSquare,
  Heart,
  Check,
  AlertTriangle
} from 'lucide-react';

interface CandidateDetail {
  id: number;
  name: string;
  age: number;
  avatar: string;
  persona: string;
  location: string;
  experience: string;
  education: string;
  sciScore: number;
  dimensions: {
    philosophy: { score: number; desc: string };
    business: { score: number; desc: string };
    mentorship: { score: number; desc: string };
    finance: { score: number; desc: string };
  };
  matchingPoints: string[];
  cautionPoints: string[];
  vision: string;
  fundingPlan: string[];
  comparison: {
    timing: { senior: string; youth: string; match: boolean };
    direction: { senior: string; youth: string; match: boolean };
    mentoring: { senior: string; youth: string; match: boolean };
  };
}

const CandidateDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  const candidate: CandidateDetail = {
    id: 1,
    name: '이준혁',
    age: 32,
    avatar: '👨‍🌾',
    persona: '장인적 계승가',
    location: '충청북도 충주시',
    experience: '사과 농장 5년 근무 (충주 지역)',
    education: '충북대학교 농업생명환경대학 졸업',
    sciScore: 97,
    dimensions: {
      philosophy: { 
        score: 100, 
        desc: '품질과 전통을 최우선으로 생각하는 가치관이 완벽히 일치합니다' 
      },
      business: { 
        score: 95, 
        desc: '안정적 운영을 선호하며 점진적 성장을 추구합니다' 
      },
      mentorship: { 
        score: 95, 
        desc: '적극적으로 배우려는 의지와 전수하려는 마음이 잘 맞습니다' 
      },
      finance: { 
        score: 90, 
        desc: '안정적인 자금 운영과 장기적 관점이 일치합니다' 
      }
    },
    matchingPoints: [
      "동일한 '장인적 계승가' 페르소나 유형",
      '5년간 사과 재배 경험 보유',
      '충북 지역 거주로 지리적 접근성 우수',
      '농대 졸업으로 이론적 기반 탄탄'
    ],
    cautionPoints: [
      '초기 자금 조달 방법 구체화 필요',
      '단계별 승계 일정 상세 논의'
    ],
    vision: '저는 품질과 전통을 중시하는 농업을 추구합니다. 5년간 사과 농장에서 일하며 재배 기술을 익혔고, 이제는 제 농장을 운영하고 싶습니다.\n\n선배님의 수십 년 노하우를 배워 더 나은 품질의 사과를 생산하고, 이를 브랜드화하여 지역 명품으로 만들고 싶습니다. 급격한 변화보다는 안정적으로 운영하며 점진적으로 발전시키는 것이 목표입니다.',
    fundingPlan: [
      '자기자본: 8,000만원',
      '청년농업인 정책자금: 2억원 (신청 예정)',
      '농지은행 지원: 1억원 (협의 중)',
      '총 예상 자금: 3.8억원'
    ],
    comparison: {
      timing: { senior: '1~3년', youth: '1~2년', match: true },
      direction: { senior: '안정적 유지', youth: '전통 계승', match: true },
      mentoring: { senior: '가끔 조언', youth: '지속적 배움', match: true }
    }
  };

  useEffect(() => {
    // Animate SCI circle on load
    const timer = setTimeout(() => {
      const progress = document.querySelector('.sci-progress') as SVGCircleElement;
      if (progress) {
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (candidate.sciScore / 100) * circumference;
        progress.style.strokeDashoffset = offset.toString();
      }
    }, 500);

    // Animate dimension bars
    const barTimer = setTimeout(() => {
      const fills = document.querySelectorAll('.dimension-fill');
      fills.forEach((fill: any) => {
        const width = fill.getAttribute('data-width');
        if (width) {
          fill.style.width = width;
        }
      });
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(barTimer);
    };
  }, []);

  const getMatchGrade = (score: number) => {
    if (score >= 95) return { text: '완벽한 매칭', emoji: '🎯' };
    if (score >= 90) return { text: '우수한 매칭', emoji: '💚' };
    if (score >= 80) return { text: '좋은 매칭', emoji: '🤝' };
    return { text: '가능한 매칭', emoji: '💬' };
  };

  const grade = getMatchGrade(candidate.sciScore);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">후계자 프로필</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </header>

      {/* Profile Header */}
      <section className="pt-14 bg-gradient-to-br from-[#00984f] to-[#00c968] px-5 pb-8 text-white text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-5xl shadow-lg">
          {candidate.avatar}
        </div>
        <h1 className="text-[28px] font-bold mb-2">{candidate.name} ({candidate.age}세)</h1>
        <div className="inline-block bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          🌟 {candidate.persona}
        </div>
        <div className="flex justify-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            충북 충주
          </span>
          <span>🌾 5년 경력</span>
          <span>🎓 농대 졸업</span>
        </div>
      </section>

      {/* SCI Report */}
      <section className="mx-5 -mt-5 bg-white rounded-2xl p-6 shadow-lg mb-5">
        <h2 className="text-lg font-bold text-center mb-5">AI 승계 궁합 분석</h2>

        {/* SCI Score Circle */}
        <div className="text-center mb-6">
          <div className="w-40 h-40 mx-auto relative">
            <svg width="160" height="160" className="transform -rotate-90">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00984f" />
                  <stop offset="100%" stopColor="#00c968" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" fill="none" stroke="#e8ebed" strokeWidth="12" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={440}
                strokeDashoffset={440}
                className="sci-progress transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-[#00984f]">{candidate.sciScore}</div>
              <div className="text-sm text-gray-600">SCI 지수</div>
            </div>
          </div>
          <div className="inline-block bg-gradient-to-r from-[#00984f] to-[#00c968] text-white px-5 py-2 rounded-full text-sm font-semibold mt-3">
            {grade.emoji} {grade.text}
          </div>
        </div>

        {/* AI Comment */}
        <div className="bg-green-50 border-l-4 border-[#00984f] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#00984f] mb-2">
            <span>🤖</span>
            <span>AI 분석 코멘트</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            두 분은 <strong>'장인정신'</strong>이라는 동일한 철학을 공유합니다. 김영철님의 수십 년 노하우가 이준혁님에게 온전히 전수될 때, 농장의 가치는 더욱 빛날 것입니다. 세대를 잇는 최고의 파트너가 될 가능성이 매우 높습니다.
          </p>
        </div>

        {/* Dimension Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4">상세 궁합 분석</h3>
          
          {[
            { key: 'philosophy', icon: '💭', label: '농업 철학', weight: '40%' },
            { key: 'business', icon: '📈', label: '사업 운영', weight: '20%' },
            { key: 'mentorship', icon: '🤝', label: '멘토십 관계', weight: '20%' },
            { key: 'finance', icon: '💰', label: '재무 조건', weight: '20%' }
          ].map(({ key, icon, label, weight }) => {
            const dim = candidate.dimensions[key as keyof typeof candidate.dimensions];
            return (
              <div key={key} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span>{icon}</span>
                    <span>{label} ({weight})</span>
                  </span>
                  <span className="text-base font-bold text-[#00984f]">{dim.score}점</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] rounded-full dimension-fill transition-all duration-700 ease-out"
                    data-width={`${dim.score}%`}
                    style={{ width: '0%' }}
                  />
                </div>
                <p className="text-xs text-gray-600">{dim.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Matching Points */}
        <div className="bg-green-50 rounded-xl p-4 mb-5">
          <h4 className="text-sm font-semibold text-[#00984f] mb-3">💚 높은 궁합 포인트</h4>
          <div className="space-y-2">
            {candidate.matchingPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-700">
                <Check size={14} className="text-[#00984f] mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caution Points */}
        <div className="bg-orange-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-orange-600 mb-3">⚠️ 협의가 필요한 부분</h4>
          <div className="space-y-2">
            {candidate.cautionPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="text-orange-600">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-5 mb-5">
        <h2 className="text-lg font-bold mb-4">주요 항목 비교</h2>
        
        {[
          { key: 'timing', label: '희망 승계 시기', icon: '🤝' },
          { key: 'direction', label: '운영 방향', icon: '✅' },
          { key: 'mentoring', label: '멘토링 희망', icon: '💚' }
        ].map(({ key, label, icon }) => {
          const comp = candidate.comparison[key as keyof typeof candidate.comparison];
          return (
            <div key={key} className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
              <h3 className="text-sm font-semibold mb-3">{label}</h3>
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-600 mb-2">김영철님</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs font-semibold">
                    {comp.senior}
                  </div>
                </div>
                <div className="mx-4 text-xl text-[#00984f]">{icon}</div>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-600 mb-2">이준혁님</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs font-semibold">
                    {comp.youth}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Profile Info */}
      <section className="px-5 mb-5">
        <h2 className="text-lg font-bold mb-4">상세 프로필</h2>

        <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
          <h3 className="text-base font-semibold mb-4">기본 정보</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">이름/나이</p>
                <p className="text-sm font-medium">{candidate.name} / {candidate.age}세</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">거주지</p>
                <p className="text-sm font-medium">{candidate.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">학력</p>
                <p className="text-sm font-medium">{candidate.education}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">경력</p>
                <p className="text-sm font-medium">{candidate.experience}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
          <h3 className="text-base font-semibold mb-4">비전과 계획</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {candidate.vision}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-base font-semibold mb-4">자금 계획</h3>
          <div className="space-y-2">
            {candidate.fundingPlan.map((item, index) => (
              <p key={index} className="text-sm text-gray-700">• {item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-50">
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`flex-1 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            isSaved 
              ? 'bg-green-50 text-[#00984f] border-2 border-[#00984f]'
              : 'bg-white text-[#00984f] border-2 border-[#00984f]'
          }`}
        >
          <Heart size={18} fill={isSaved ? '#00984f' : 'none'} />
          {isSaved ? '저장됨' : '관심 저장'}
        </button>
        <button
          onClick={() => navigate(`/matching/connect/${id}`)}
          className="flex-1 py-3.5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2"
        >
          <MessageSquare size={18} />
          대화 시작하기
        </button>
      </div>
    </div>
  );
};

export default CandidateDetail;