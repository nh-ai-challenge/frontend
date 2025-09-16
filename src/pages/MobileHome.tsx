import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Sprout, Shield, ChevronRight } from 'lucide-react';

const MobileHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#008350] to-[#00a865] text-white px-4 py-8">
        <div className="mb-6">
          <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-4">
            NH농협이 연결하는 농업의 미래
          </div>
          <h1 className="text-2xl font-bold mb-2">
            농장 승계의<br />
            새로운 시작을 함께
          </h1>
          <p className="text-sm opacity-90">
            AI 매칭으로 찾는 최적의 파트너
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/senior/value-check')}
            className="bg-white text-[#008350] rounded-xl p-4 text-left"
          >
            <div className="text-2xl mb-2">👨‍🌾</div>
            <div className="font-semibold text-sm">시니어 농부</div>
            <div className="text-xs text-gray-600 mt-1">농장 가치 확인</div>
          </button>
          <button
            onClick={() => navigate('/youth/profile')}
            className="bg-white text-[#0065B3] rounded-xl p-4 text-left"
          >
            <div className="text-2xl mb-2">🌱</div>
            <div className="font-semibold text-sm">청년 농부</div>
            <div className="text-xs text-gray-600 mt-1">농장 찾기</div>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-[#008350]">98%</div>
              <div className="text-xs text-gray-600">매칭 성공률</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#008350]">3,850</div>
              <div className="text-xs text-gray-600">등록 농장</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#008350]">1,200+</div>
              <div className="text-xs text-gray-600">청년 농부</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-4">주요 서비스</h2>
        <div className="space-y-3">
          <FeatureCard
            icon={<TrendingUp size={20} />}
            title="AI 가치평가"
            description="객관적인 농장 가치 산정"
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <FeatureCard
            icon={<Users size={20} />}
            title="AI 매칭"
            description="최적의 파트너 추천"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <FeatureCard
            icon={<Shield size={20} />}
            title="안전한 거래"
            description="단계별 승계 프로세스"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <FeatureCard
            icon={<Sprout size={20} />}
            title="금융 지원"
            description="맞춤형 금융 상품"
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 mt-8 mb-8">
        <div className="bg-[#008350] rounded-xl p-6 text-white">
          <h3 className="font-bold mb-2">지금 시작하세요</h3>
          <p className="text-sm opacity-90 mb-4">
            5분 간단 등록으로 농장의 미래를 열어보세요
          </p>
          <button className="w-full bg-white text-[#008350] py-3 rounded-lg font-semibold">
            무료로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = ({ icon, title, description, color, bgColor }) => (
  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`${bgColor} ${color} p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
    </div>
    <ChevronRight size={20} className="text-gray-400" />
  </div>
);

export default MobileHome;