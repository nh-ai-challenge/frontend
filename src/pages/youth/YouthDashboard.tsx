import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  ChevronRight,
  MapPin,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Video,
  FileText,
  Users,
  Thermometer,
  Droplets,
  Activity,
  BarChart3,
  Cloud,
  DollarSign,
  Bug,
  Building2
} from 'lucide-react';

interface Farm {
  id: number;
  name: string;
  owner: string;
  location: string;
  avatar: string;
  matchScore: number;
  area: string;
  value: string;
  period: string;
}

interface RiskFactor {
  icon: React.ReactNode;
  name: string;
  status: string;
  level: 'good' | 'warning' | 'danger';
  levelText: string;
}

const YouthDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [hasNotifications] = useState(true);

  const farms: Farm[] = [
    {
      id: 1,
      name: '김영철의 사과농원',
      owner: '김영철',
      location: '충청북도 충주시',
      avatar: '👨‍🌾',
      matchScore: 92,
      area: '3.5ha',
      value: '4.2억',
      period: '1-3년'
    },
    {
      id: 2,
      name: '정순희 포도농장',
      owner: '정순희',
      location: '충청남도 천안시',
      avatar: '👩‍🌾',
      matchScore: 87,
      area: '2.8ha',
      value: '3.5억',
      period: '즉시가능'
    }
  ];

  const riskFactors: RiskFactor[] = [
    {
      icon: <Cloud size={20} />,
      name: '기상 리스크',
      status: '봄철 냉해 주의 필요',
      level: 'good',
      levelText: '낮음'
    },
    {
      icon: <DollarSign size={20} />,
      name: '시장 가격',
      status: '작년 대비 8% 상승',
      level: 'good',
      levelText: '안정'
    },
    {
      icon: <Bug size={20} />,
      name: '병충해',
      status: '탄저병 발생 주의보',
      level: 'warning',
      levelText: '주의'
    },
    {
      icon: <Building2 size={20} />,
      name: '정책 지원',
      status: '청년농 지원 확대',
      level: 'good',
      levelText: '유리'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-semibold">
            이
          </div>
          <div>
            <div className="text-base font-semibold">이준혁님</div>
            <div className="text-xs text-[#00984f] font-medium">🚀 혁신적 도전가</div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/notifications')}
          className="p-2 relative"
        >
          <Bell size={24} className="text-gray-600" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </header>

      <main className="pt-14 pb-20">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-br from-[#00984f] to-[#00c968] text-white px-5 pt-6 pb-8">
          <p className="text-sm opacity-90 mb-1">안녕하세요, 이준혁님!</p>
          <h1 className="text-[28px] font-bold leading-tight mb-6">
            당신을 기다리는<br />
            농장이 있습니다
          </h1>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">8개</div>
              <div className="text-xs opacity-90">매칭 농장</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-xs opacity-90">최고 매칭률</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">3곳</div>
              <div className="text-xs opacity-90">관심 표현</div>
            </div>
          </div>
        </section>

        {/* AI Matching Alert */}
        <div 
          onClick={() => navigate('/matching/list')}
          className="mx-5 mt-5 bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer active:scale-98 transition-transform relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
          <span className="text-3xl">🎯</span>
          <div className="flex-1">
            <h3 className="font-bold text-base mb-1">새로운 매칭이 도착했습니다!</h3>
            <p className="text-sm text-gray-600">충주 사과농장 김영철님 (SCI 92점)</p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* Satellite Data Analysis */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              🛰️ 위성 데이터 분석
            </h2>
            <button className="text-sm text-[#00984f]">전체보기</button>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-4 flex items-center justify-center h-32">
              <div className="text-center">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm font-semibold mt-2">충주 사과농장</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Thermometer size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">평균 기온</p>
                  <p className="text-base font-bold">
                    12.5°C
                    <span className="text-xs text-green-600 ml-1">+0.5°</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplets size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">토양 수분</p>
                  <p className="text-base font-bold">
                    68%
                    <span className="text-xs text-green-600 ml-1">적정</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">NDVI 지수</p>
                  <p className="text-base font-bold">
                    0.82
                    <span className="text-xs text-green-600 ml-1">우수</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">생산성 예측</p>
                  <p className="text-base font-bold">
                    115%
                    <span className="text-xs text-green-600 ml-1">증가</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-sm text-gray-700 flex-1">
                올해 충주 지역 사과 농장은 <strong className="text-orange-600">평년 대비 15% 높은 생산성</strong>이 예상됩니다
              </p>
            </div>
          </div>
        </section>

        {/* Risk Analysis */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              ⚡ 리스크 분석
            </h2>
            <button className="text-sm text-[#00984f]">상세분석</button>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00984f]">78</div>
                <div className="text-sm text-gray-600">안정적</div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">종합 리스크 평가</h3>
                <p className="text-sm text-gray-600">현재 농장 운영에 적합한 조건입니다</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-5">
              {riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {factor.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{factor.name}</p>
                    <p className="text-xs text-gray-600">{factor.status}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    factor.level === 'good' ? 'bg-green-100 text-green-700' :
                    factor.level === 'warning' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {factor.levelText}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/risk-report')}
              className="w-full py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <BarChart3 size={20} />
              <span>상세 리스크 리포트 보기</span>
            </button>
          </div>
        </section>

        {/* Recommended Farms */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">추천 농장</h2>
            <button 
              onClick={() => navigate('/matching/list')}
              className="text-sm text-[#00984f]"
            >
              전체보기
            </button>
          </div>
          
          {farms.map((farm) => (
            <div 
              key={farm.id}
              onClick={() => navigate(`/matching/profile/${farm.id}`)}
              className="bg-white rounded-2xl p-5 shadow-sm mb-3 cursor-pointer active:scale-98 transition-transform"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {farm.matchScore}% 매칭
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{farm.avatar}</span>
                <div>
                  <h3 className="font-bold text-base">{farm.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin size={14} />
                    {farm.location}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-600">면적</p>
                  <p className="text-sm font-bold">{farm.area}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">농장가치</p>
                  <p className="text-sm font-bold text-[#00984f]">{farm.value}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">승계시기</p>
                  <p className="text-sm font-bold">{farm.period}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Learning Resources */}
        <section className="mt-6 px-5 mb-6">
          <h2 className="text-lg font-bold mb-4">학습 리소스</h2>
          
          <div className="grid grid-cols-4 gap-3">
            <button className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📚</div>
              <p className="text-xs font-semibold">농업 기초</p>
              <p className="text-[10px] text-gray-600">12개 강의</p>
            </button>
            
            <button className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎥</div>
              <p className="text-xs font-semibold">실전 영상</p>
              <p className="text-[10px] text-gray-600">48개 영상</p>
            </button>
            
            <button className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-xs font-semibold">정책 가이드</p>
              <p className="text-[10px] text-gray-600">최신 업데이트</p>
            </button>
            
            <button className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-xs font-semibold">멘토링</p>
              <p className="text-[10px] text-gray-600">3명 매칭</p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default YouthDashboard;