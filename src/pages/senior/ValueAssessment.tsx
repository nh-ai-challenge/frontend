import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  MapPin,
  TrendingUp,
  Loader2,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

const ValueAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressResults, setShowAddressResults] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState(1);

  const handleAddressSearch = (value: string) => {
    if (value.length > 0) {
      setShowAddressResults(true);
    } else {
      setShowAddressResults(false);
    }
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddressResults(false);
    setShowAdditionalInfo(true);
  };

  const handleCropSelect = (crop: string) => {
    setSelectedCrop(crop);
  };

  const handleEvaluate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 3000);
  };

  const crops = ['사과', '배', '포도', '딸기', '토마토', '기타'];

  return (
    <>
      {/* 메인 페이지 */}
      <div className={`min-h-screen bg-white ${showResult ? 'hidden' : ''}`}>
        {/* 헤더 */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold">농장 가치평가</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <HelpCircle size={20} className="text-gray-600" />
          </button>
        </header>

        {/* 컨텐츠 */}
        <main className="pt-14 pb-24">
          {/* 프로그레스 바 */}
          <div className="p-5 bg-white border-b border-gray-100">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] transition-all duration-300"
                style={{ width: '33%' }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">1단계 / 3단계</p>
          </div>

          {/* 메인 폼 */}
          <div className="px-5 pt-8">
            {/* 아이콘 */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin size={40} className="text-[#00984f]" />
            </div>

            {/* 제목 */}
            <h2 className="text-2xl font-bold text-center mb-3">
              농장 주소를 입력해주세요
            </h2>
            <p className="text-center text-gray-600 mb-10">
              정확한 주소를 입력하시면<br />
              AI가 즉시 농장 가치를 평가해드립니다
            </p>

            {/* 주소 입력 */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                농장 주소
                <HelpCircle size={16} className="text-gray-400" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: 충북 충주시 사과로 123"
                  value={selectedAddress}
                  onChange={(e) => {
                    setSelectedAddress(e.target.value);
                    handleAddressSearch(e.target.value);
                  }}
                  className="w-full h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00984f] focus:bg-green-50/30"
                />
                <button 
                  onClick={() => handleAddressSearch(selectedAddress)}
                  className="absolute right-2 top-2 w-10 h-10 bg-[#00984f] rounded-lg flex items-center justify-center"
                >
                  <Search size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* 주소 검색 결과 */}
            {showAddressResults && (
              <div className="bg-gray-50 rounded-xl p-2 mb-6">
                <button
                  onClick={() => handleAddressSelect('충청북도 충주시 사과로 123')}
                  className="w-full p-3 bg-white rounded-lg mb-2 text-left hover:bg-gray-50"
                >
                  <p className="font-semibold text-sm">충청북도 충주시 사과로 123</p>
                  <p className="text-xs text-gray-500">우편번호: 27432</p>
                </button>
                <button
                  onClick={() => handleAddressSelect('충청북도 충주시 사과로 123-1')}
                  className="w-full p-3 bg-white rounded-lg text-left hover:bg-gray-50"
                >
                  <p className="font-semibold text-sm">충청북도 충주시 사과로 123-1</p>
                  <p className="text-xs text-gray-500">우편번호: 27432</p>
                </button>
              </div>
            )}

            {/* 추가 정보 */}
            {showAdditionalInfo && (
              <div className="border-t border-gray-100 pt-8 mt-8">
                <h3 className="text-base font-semibold mb-5">농장 기본 정보</h3>

                {/* 농장 면적 */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    농장 면적
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="면적 입력"
                      className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00984f]"
                    />
                    <select className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00984f]">
                      <option>평</option>
                      <option>㎡</option>
                      <option>ha</option>
                    </select>
                  </div>
                </div>

                {/* 주요 작물 */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    주요 작물
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {crops.map((crop) => (
                      <button
                        key={crop}
                        onClick={() => handleCropSelect(crop)}
                        className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCrop === crop
                            ? 'bg-green-100 text-[#00984f] border-2 border-[#00984f]'
                            : 'bg-white border border-gray-200 text-gray-600'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 운영 경력 */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    운영 경력
                  </label>
                  <select className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00984f]">
                    <option value="">선택하세요</option>
                    <option>5년 미만</option>
                    <option>5-10년</option>
                    <option>10-20년</option>
                    <option>20년 이상</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
          <button
            onClick={handleEvaluate}
            disabled={!selectedAddress || !selectedCrop}
            className={`w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
              selectedAddress && selectedCrop
                ? 'bg-gradient-to-r from-[#00984f] to-[#00c968] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <span>🤖</span>
            <span>AI 가치평가 시작</span>
          </button>
        </div>
      </div>

      {/* 로딩 모달 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl p-10 text-center">
            <Loader2 size={60} className="text-[#00984f] animate-spin mx-auto mb-5" />
            <p className="text-base font-semibold mb-2">AI가 분석 중입니다</p>
            <p className="text-sm text-gray-600">잠시만 기다려주세요...</p>
          </div>
        </div>
      )}

      {/* 결과 모달 */}
      {showResult && (
        <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
          {/* 헤더 */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
            <h2 className="text-lg font-semibold">농장 가치평가 결과</h2>
            <button 
              onClick={() => {
                setShowResult(false);
                navigate('/senior/survey');
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* 결과 컨텐츠 */}
          <div className="px-5 py-6 pb-20">
            {/* 메인 가치 카드 */}
            <div className="bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-2xl p-6 text-white mb-6">
              <p className="text-sm opacity-90 mb-2">AI 예상 농장 가치</p>
              <p className="text-4xl font-bold mb-4">4.2억원</p>
              
              <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2 inline-flex items-center gap-2 mb-4">
                <span>🎯</span>
                <span className="text-sm font-semibold">신뢰도 92%</span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-xl font-semibold">3.5ha</p>
                  <p className="text-xs opacity-90">농장 면적</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">사과</p>
                  <p className="text-xs opacity-90">주요 작물</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">A등급</p>
                  <p className="text-xs opacity-90">평가 등급</p>
                </div>
              </div>
            </div>

            {/* AI 분석 과정 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <span>🤖</span> AI가 분석한 과정
                </h3>
                <span className="bg-green-100 text-[#00984f] text-xs px-3 py-1 rounded-full font-semibold">
                  투명한 AI
                </span>
              </div>

              {/* 3단계 프로세스 */}
              <div className="bg-gray-50 rounded-xl p-3 flex gap-2 mb-5">
                {[
                  { num: 1, title: '데이터 수집', desc: '382개 유사 농장' },
                  { num: 2, title: '특성 비교', desc: '27개 변수' },
                  { num: 3, title: '가치 산정', desc: 'ML 모델' }
                ].map((step) => (
                  <button
                    key={step.num}
                    onClick={() => setSelectedStep(step.num)}
                    className={`flex-1 p-3 rounded-lg transition-all ${
                      selectedStep === step.num 
                        ? 'bg-white shadow-sm' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                        selectedStep === step.num
                          ? 'bg-[#00984f] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.num}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-gray-700">{step.title}</p>
                        <p className="text-[10px] text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Step 1: 데이터 수집 */}
              {selectedStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-sm text-blue-700">
                      💭 "충주시 사과농장 3.5ha를 분석하기 위해 유사한 조건의 농장들을 찾아볼게요"
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🍎</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-600">사과농장</p>
                            <p className="text-sm font-bold text-[#00984f]">382개</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">📍</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-600">충주/인근</p>
                            <p className="text-sm font-bold text-gray-700">156개</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 text-center">
                      데이터 출처: 한국부동산원, 농지은행, NH빅데이터
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: 특성 비교 */}
              {selectedStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-sm text-blue-700">
                      💭 "농장님의 농장이 다른 농장보다 어떤 점이 특별한지 비교해봤어요"
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold mb-3">🌟 강점 (상위 20%)</h4>
                    <div className="space-y-2">
                      {[
                        { name: '도로 접근성', score: 95 },
                        { name: '토양 품질', score: 88 },
                        { name: '일조량', score: 92 }
                      ].map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 w-20">{item.name}</span>
                          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968]"
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-[#00984f]">{item.score}점</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: 가치 산정 */}
              {selectedStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-sm text-blue-700">
                      💭 "3가지 AI 모델로 교차 검증했어요. 결과가 비슷해서 신뢰도가 높아요!"
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { name: '딥러닝', value: '4.18억', confidence: 94 },
                      { name: '랜덤포레스트', value: '4.23억', confidence: 91 },
                      { name: 'GB', value: '4.19억', confidence: 89 }
                    ].map((model) => (
                      <div key={model.name} className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-[10px] text-gray-500 mb-2">{model.name}</p>
                        <p className="text-lg font-bold text-[#00984f] mb-2">{model.value}</p>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#00984f]"
                            style={{ width: `${model.confidence}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">{model.confidence}%</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-600 mb-1">최종 AI 예측값</p>
                    <p className="text-2xl font-bold text-[#00984f]">4.2억원</p>
                    <p className="text-[10px] text-gray-500">(오차범위 ±0.15억)</p>
                  </div>
                </div>
              )}
            </div>

            {/* 상세 가치 구성 */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-4">상세 가치 구성</h3>
              <div className="space-y-3">
                {[
                  { name: '토지 가치', value: '2.8억원', details: ['공시지가: 2.2억', '실거래 보정: +0.4억', '위치 프리미엄: +0.2억'] },
                  { name: '시설 가치', value: '0.9억원', details: ['비닐하우스 3동: 0.5억', '저온저장고: 0.2억', '농기계: 0.2억'] },
                  { name: '사업 가치', value: '0.5억원', details: ['연평균 매출: 8천만', '거래처: 0.2억', '브랜드: 0.1억'] }
                ].map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => setExpandedAnalysis(expandedAnalysis === item.name ? null : item.name)}
                      className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-[#00984f]">{item.value}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-400 transition-transform ${
                            expandedAnalysis === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    {expandedAnalysis === item.name && (
                      <div className="bg-gray-50 px-4 pb-4 -mt-1 rounded-b-xl">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-600 mt-2">• {detail}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 농지연금 예상 */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h3 className="text-base font-semibold mb-3">농지연금 예상</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">월 예상 수령액</span>
                  <span className="text-base font-bold text-[#0065B3]">280만원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">연간 예상 수령액</span>
                  <span className="text-base font-bold text-[#0065B3]">3,360만원</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                * 65세 기준, 종신형 상품 기준 예상액
              </p>
            </div>

            {/* 다음 단계 버튼 */}
            <button
              onClick={() => navigate('/senior/survey')}
              className="w-full h-14 bg-[#00984f] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
            >
              최적 후계자 찾기
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ValueAssessment;