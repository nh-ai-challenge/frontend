import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, DollarSign, BarChart, Handshake, Building2, Scale } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSeniorClick = () => {
    navigate('/senior/value-check');
  };

  const handleYouthClick = () => {
    navigate('/youth/profile');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="mt-16 bg-gradient-to-br from-[#f5f9f7] to-[#f5f1e9] py-20 min-h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#008350] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                NH농협이 연결하는 농업의 미래
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                <span className="text-[#008350]">농장 승계</span>의<br />
                새로운 시작을 함께
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                AI 매칭으로 찾는 최적의 파트너<br />
                시니어 농부님의 경험과 청년의 열정이 만나는 곳
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSeniorClick}
                  className="px-8 py-4 bg-[#008350] text-white rounded-lg font-semibold text-lg hover:bg-[#006940] transition-colors flex items-center gap-2"
                >
                  내 농장 가치 알아보기
                </button>
                <button 
                  onClick={handleYouthClick}
                  className="px-8 py-4 bg-white text-[#0065B3] border-2 border-[#0065B3] rounded-lg font-semibold text-lg hover:bg-[#f0f7ff] transition-colors flex items-center gap-2"
                >
                  내게 맞는 농장 찾기
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <div className="w-32 h-32 bg-gradient-to-br from-[#008350] to-[#00a865] rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-5 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-[#008350] mb-2">98%</div>
                  <div className="text-sm text-gray-600">매칭 성공률</div>
                </div>
                <div className="text-center p-5 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-[#008350] mb-2">3,850</div>
                  <div className="text-sm text-gray-600">등록된 농장</div>
                </div>
                <div className="text-center p-5 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-[#008350] mb-2">1,200+</div>
                  <div className="text-sm text-gray-600">청년 농부</div>
                </div>
                <div className="text-center p-5 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-[#008350] mb-2">450억</div>
                  <div className="text-sm text-gray-600">누적 거래액</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-5">
            Land Bridge가 특별한 이유
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            NH농협의 신뢰와 AI 기술이 만드는 안전한 농장 승계
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain size={32} className="text-[#00984f]" />}
              title="AI 정밀 매칭"
              description="가치관, 경영철학, 품목 등 다각도 분석으로 최적의 파트너 매칭"
            />
            <FeatureCard
              icon={<DollarSign size={32} className="text-[#00984f]" />}
              title="농지연금신탁 연계"
              description="안정적인 노후 보장과 원활한 승계를 위한 금융 솔루션"
            />
            <FeatureCard
              icon={<BarChart size={32} className="text-[#00984f]" />}
              title="AI 가치평가"
              description="객관적이고 투명한 농장 가치 산정 시스템"
            />
            <FeatureCard
              icon={<Handshake size={32} className="text-[#00984f]" />}
              title="3단계 파트너십"
              description="인턴십부터 최종 승계까지 단계별 안전한 진행"
            />
            <FeatureCard
              icon={<Building2 size={32} className="text-[#00984f]" />}
              title="영농승계 브릿지론"
              description="청년 농부를 위한 맞춤형 금융 지원"
            />
            <FeatureCard
              icon={<Scale size={32} className="text-[#00984f]" />}
              title="법률 지원"
              description="계약서 작성부터 등기까지 전문가 원스톱 서비스"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#008350] to-[#00a865]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="15년" description="평균 농업 경력" />
            <StatItem value="89%" description="재매칭 성공률" />
            <StatItem value="24시간" description="평균 매칭 시간" />
            <StatItem value="365일" description="전문 상담 지원" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f5f1e9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            5분 간단 등록으로 농장의 미래를 열어보세요<br />
            NH농협이 함께하는 안심 농장 승계 플랫폼
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleSeniorClick}
              className="px-8 py-4 bg-[#008350] text-white rounded-lg font-semibold text-lg hover:bg-[#006940] transition-colors flex items-center gap-2"
            >
              시니어 농부로 시작하기
            </button>
            <button 
              onClick={handleYouthClick}
              className="px-8 py-4 bg-white text-[#0065B3] border-2 border-[#0065B3] rounded-lg font-semibold text-lg hover:bg-[#f0f7ff] transition-colors flex items-center gap-2"
            >
              청년 농부로 시작하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-8 bg-gray-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
    <div className="w-20 h-20 bg-gradient-to-br from-[#e8f5ef] to-[#f5f1e9] rounded-full flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StatItem: React.FC<{ value: string; description: string }> = ({ value, description }) => (
  <div className="text-center text-white">
    <div className="text-5xl font-bold mb-2">{value}</div>
    <div className="text-lg opacity-90">{description}</div>
  </div>
);

export default Home;