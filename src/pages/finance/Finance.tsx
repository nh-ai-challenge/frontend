import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Phone,
  Car,
  Building,
  Shield,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  ChevronRight,
  AlertCircle,
  Lock,
  BarChart3,
  Users
} from 'lucide-react';

interface FinanceProduct {
  id: number;
  name: string;
  type: string;
  rate: string;
  features: string[];
  details: {
    limit: string;
    period: string;
    monthly: string;
  };
  recommended?: boolean;
}

const Finance: React.FC = () => {
  const navigate = useNavigate();
  const [sharePercent, setSharePercent] = useState(30);
  const [repaymentPeriod, setRepaymentPeriod] = useState(10);
  const [showCallModal, setShowCallModal] = useState(false);

  const farmValue = 420000000; // 4.2억
  const selfFund = 80000000; // 8천만
  const requiredAmount = (farmValue * sharePercent) / 100;
  const loanAmount = Math.max(0, requiredAmount - selfFund);
  const monthlyPayment = Math.round(loanAmount / (repaymentPeriod * 12) / 10000);

  const products: FinanceProduct[] = [
    {
      id: 1,
      name: 'NH 청년농 승계자금',
      type: '농장 승계 전용 대출',
      rate: '1.5',
      features: ['최대 3억', '20년 상환', '3년 거치'],
      details: {
        limit: '3억원',
        period: '20년',
        monthly: '42만원'
      },
      recommended: true
    },
    {
      id: 2,
      name: '농신보 보증대출',
      type: '신용보증 지원',
      rate: '2.0',
      features: ['최대 2억', '15년 상환', '무담보'],
      details: {
        limit: '2억원',
        period: '15년',
        monthly: '58만원'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">금융 지원</h1>
        </div>
      </header>

      {/* Finance Header */}
      <section className="pt-[60px] bg-gradient-to-br from-[#00984f] to-[#00c968] px-5 pb-8 text-white text-center">
        <div className="inline-block bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
          김영철님 - 이준혁님 매칭
        </div>
        <h2 className="text-[28px] font-bold mb-2">맞춤 금융 솔루션</h2>
        <p className="text-base opacity-95">농장 승계를 위한 최적의 금융 상품</p>
      </section>

      {/* Calculator Card */}
      <section className="-mt-5 mx-5 mb-5 bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
            💰
          </div>
          <div>
            <h3 className="text-lg font-bold">승계 자금 계산기</h3>
            <p className="text-sm text-gray-600">필요 자금과 대출 조건을 확인하세요</p>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-xl p-5 mb-5">
          <p className="text-sm text-gray-600 mb-2">예상 필요 자금</p>
          <p className="text-4xl font-bold text-[#00984f] mb-3">
            {(requiredAmount / 100000000).toFixed(2)}억원
          </p>
          <div className="space-y-2 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">농장 가치 ({sharePercent}%)</span>
              <span className="font-semibold">{(requiredAmount / 100000000).toFixed(2)}억원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">자기자본</span>
              <span className="font-semibold">8,000만원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">대출 필요액</span>
              <span className="font-semibold">{(loanAmount / 10000).toFixed(0)}만원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">월 상환액 ({repaymentPeriod}년)</span>
              <span className="font-semibold">{monthlyPayment}만원</span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[15px] font-semibold">초기 지분율</span>
            <span className="text-base font-bold text-[#00984f]">{sharePercent}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="50"
            value={sharePercent}
            onChange={(e) => setSharePercent(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>20%</span>
            <span>50%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[15px] font-semibold">상환 기간</span>
            <span className="text-base font-bold text-[#00984f]">{repaymentPeriod}년</span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>5년</span>
            <span>20년</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
        <h3 className="text-lg font-bold mb-4">추천 금융상품</h3>
        
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => alert('상품 상세 페이지로 이동합니다')}
            className={`relative bg-white border-2 rounded-2xl p-5 mb-3 cursor-pointer transition-all ${
              product.recommended 
                ? 'border-[#00984f] bg-green-50'
                : 'border-gray-200 hover:border-[#00984f]'
            }`}
          >
            {product.recommended && (
              <span className="absolute -top-3 right-5 bg-[#00984f] text-white px-3 py-1 rounded-xl text-xs font-semibold">
                최적 상품
              </span>
            )}
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#00984f]">{product.rate}%</p>
                <p className="text-xs text-gray-600">연이율</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-3">
              {product.features.map((feature, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">한도</p>
                <p className="text-sm font-semibold">{product.details.limit}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">기간</p>
                <p className="text-sm font-semibold">{product.details.period}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">월 상환</p>
                <p className="text-sm font-semibold">{product.details.monthly}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pension Calculator */}
      <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
        <h3 className="text-lg font-bold mb-4">농지연금 (시니어용)</h3>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
              🏦
            </div>
            <div>
              <h4 className="text-lg font-bold">농지연금 예상 수령액</h4>
              <p className="text-sm text-gray-600">김영철님 (65세) 기준</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">매월 수령액</p>
            <p className="text-3xl font-bold text-orange-500 mb-1">152만원</p>
            <p className="text-xs text-gray-500">종신 지급 보장</p>
          </div>
        </div>
        
        <div className="mt-5 bg-orange-50 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-gray-700 leading-relaxed">
            농지를 담보로 <strong className="text-orange-500">매월 연금</strong>을 받으면서
            <strong className="text-orange-500"> 농사는 계속</strong> 지을 수 있습니다
          </div>
        </div>
      </section>

      {/* Smart Contract */}
      <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
        <h3 className="text-lg font-bold mb-4">NH 스마트 계약</h3>
        
        <div className="relative bg-gray-50 rounded-2xl p-5 overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#00984f] text-white px-10 py-1 text-xs font-semibold transform rotate-45 translate-x-8 translate-y-4">
            NEW
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <h4 className="text-lg font-bold">블록체인 기반 승계 계약</h4>
          </div>
          
          <div className="space-y-3 mb-5">
            {[
              { icon: <Lock size={16} />, title: '위변조 불가능', desc: '블록체인으로 안전하게 보관' },
              { icon: '⚡', title: '자동 이행', desc: '조건 충족 시 자동 실행' },
              { icon: <BarChart3 size={16} />, title: '투명한 관리', desc: '모든 거래 내역 실시간 확인' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-[#00984f]">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => alert('스마트 계약 작성 페이지로 이동합니다')}
            className="w-full py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl font-bold text-lg"
          >
            스마트 계약 만들기
          </button>
        </div>
      </section>

      {/* Consultation */}
      <section className="bg-white px-5 py-5">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            👨‍💼
          </div>
          <h3 className="text-xl font-bold mb-2">전문가 1:1 상담</h3>
          <p className="text-sm text-gray-700 mb-5 leading-relaxed">
            농장 승계 전문가가<br />
            맞춤형 금융 솔루션을 제안해드립니다
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCallModal(true)}
              className="flex-1 py-3.5 bg-[#00984f] text-white rounded-xl font-semibold"
            >
              전화 상담 신청
            </button>
            <button 
              onClick={() => alert('방문 상담 예약 페이지로 이동합니다')}
              className="flex-1 py-3.5 bg-white text-[#00984f] border-2 border-[#00984f] rounded-xl font-semibold"
            >
              방문 상담 예약
            </button>
          </div>
        </div>
      </section>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-5">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-[#00984f]" />
            </div>
            <h3 className="text-xl font-bold mb-2">상담 신청 완료</h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              상담 신청이 완료되었습니다.<br />
              영업일 기준 1일 이내 연락드리겠습니다.
            </p>
            <button 
              onClick={() => setShowCallModal(false)}
              className="w-full py-3 bg-[#00984f] text-white rounded-xl font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;