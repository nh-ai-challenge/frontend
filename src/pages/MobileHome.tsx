import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  ChevronRight,
  Bell,
  MessageSquare,
  FileText,
  Scale,
  DollarSign,
  BarChart3,
  Clock,
  Award,
  HandshakeIcon,
  GraduationCap,
  MapPin,
  Calculator
} from 'lucide-react';

const MobileHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f7f9fb] min-h-screen">
      {/* 올원뱅크 스타일 헤더 */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00984f] rounded-lg flex items-center justify-center text-white font-bold text-xs">
            NH
          </div>
          <span className="text-lg font-bold text-[#00984f]">팀명 뭐해요?</span>
        </div>
        <button className="p-2">
          <Bell size={20} className="text-gray-600" />
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="pt-14 pb-20">
        {/* 메인 히어로 배너 */}
        <section className="bg-gradient-to-br from-[#00984f] to-[#00c968] text-white">
          <div className="px-5 pt-6 pb-8">
            <div className="text-sm opacity-90 mb-2">
              NH농협과 함께하는 농장 승계 플랫폼
            </div>
            <h1 className="text-2xl font-bold leading-tight mb-2">
              대한민국 농업의<br />
              지속가능한 미래
            </h1>
            <p className="text-sm opacity-85 mb-6">
              AI 매칭으로 시니어와 청년을 연결합니다
            </p>
            
            {/* 메인 액션 버튼 - 2개 큰 버튼 */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/senior/profile')}
                className="bg-white rounded-xl p-4 text-center shadow-lg active:scale-98 transition-transform"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users size={24} className="text-green-700" />
                </div>
                <div className="font-bold text-sm text-gray-900">농장 팔기</div>
                <div className="text-xs text-gray-600 mt-1">시니어 농부님</div>
              </button>
              <button
                onClick={() => navigate('/youth/profile')}
                className="bg-white rounded-xl p-4 text-center shadow-lg active:scale-98 transition-transform"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp size={24} className="text-blue-700" />
                </div>
                <div className="font-bold text-sm text-gray-900">농장 찾기</div>
                <div className="text-xs text-gray-600 mt-1">청년 농부</div>
              </button>
            </div>
          </div>

          {/* 실시간 현황 */}
          <div className="bg-white/10 backdrop-blur px-5 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">3,850</div>
                <div className="text-xs opacity-90">등록 농장</div>
              </div>
              <div>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-xs opacity-90">청년 농부</div>
              </div>
              <div>
                <div className="text-2xl font-bold">456</div>
                <div className="text-xs opacity-90">성공 매칭</div>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 3가지 */}
        <section className="px-5 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">핵심 서비스</h2>
            
            {/* AI 가치평가 */}
            <button
              onClick={() => navigate('/senior/profile')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                  <Calculator size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">우리 농장 가격 알아보기</div>
                  <div className="text-xs text-gray-600">주소만 입력하면 즉시 확인</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">무료</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </button>

            {/* AI 매칭 */}
            <button
              onClick={() => navigate('/matching/intro')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00984f] rounded-xl flex items-center justify-center text-white">
                  <Users size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">AI 승계 매칭</div>
                  <div className="text-xs text-gray-600">최적의 파트너를 찾아드립니다</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>

            {/* 금융 상품 */}
            <button
              onClick={() => navigate('/finance')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <DollarSign size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">맞춤형 금융지원</div>
                  <div className="text-xs text-gray-600">농지연금, 브릿지론 등</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </section>

        {/* NH 팜링크만의 특징 */}
        <section className="px-5 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">NH 팜링크만의 특징</h2>
            <div className="space-y-3">
              <FeatureItem
                icon={<Award size={20} className="text-[#00984f]" />}
                title="98% 매칭 성공률"
                description="AI가 분석한 최적 파트너"
              />
              <FeatureItem
                icon={<Clock size={20} className="text-blue-600" />}
                title="평균 24시간 매칭"
                description="신속한 매칭 프로세스"
              />
              <FeatureItem
                icon={<HandshakeIcon size={20} className="text-purple-600" />}
                title="3단계 안전 거래"
                description="인턴십→파트너십→승계"
              />
              <FeatureItem
                icon={<Scale size={20} className="text-orange-600" />}
                title="안전한 계약"
                description="NH농협이 보증하는 거래"
              />
            </div>
          </div>
        </section>

        {/* 최근 성공 사례 */}
        <section className="px-5 mt-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">최근 성공 사례</h2>
            <button 
              onClick={() => navigate('/success-stories')}
              className="text-sm text-[#00984f] font-medium"
            >
              더보기 <ChevronRight size={14} className="inline" />
            </button>
          </div>
          
          <div className="space-y-3">
            <SuccessCard
              location="충북 충주"
              type="사과농장"
              size="3.5ha"
              amount="4.2억"
              matchScore="95"
              status="complete"
            />
            <SuccessCard
              location="전남 나주"
              type="배농장"
              size="2.8ha"
              amount="3.8억"
              matchScore="92"
              status="progress"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

// 특징 아이템 컴포넌트
const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-gray-600">{description}</div>
    </div>
  </div>
);

// 성공 사례 카드 컴포넌트
const SuccessCard: React.FC<{
  location: string;
  type: string;
  size: string;
  amount: string;
  matchScore: string;
  status: 'complete' | 'progress';
}> = ({ location, type, size, amount, matchScore, status }) => (
  <button className="w-full bg-white rounded-xl p-4 shadow-sm text-left">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className={`inline-block text-xs px-2 py-1 rounded-full font-semibold mb-2 ${
          status === 'complete' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {status === 'complete' ? '매칭 완료' : '진행 중'}
        </span>
        <h3 className="font-semibold text-sm">{location} {type}</h3>
      </div>
      <ChevronRight size={18} className="text-gray-400 mt-2" />
    </div>
    <div className="flex gap-4 text-xs">
      <div>
        <span className="text-gray-500">규모</span>
        <div className="font-bold">{size}</div>
      </div>
      <div>
        <span className="text-gray-500">승계금액</span>
        <div className="font-bold text-[#00984f]">{amount}</div>
      </div>
      <div>
        <span className="text-gray-500">매칭점수</span>
        <div className="font-bold text-orange-500">{matchScore}점</div>
      </div>
    </div>
  </button>
);

export default MobileHome;