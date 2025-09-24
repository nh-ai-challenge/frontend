import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const isSimpleMode = searchParams.get('mode') === 'simple';
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressResults, setShowAddressResults] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState(1);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

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
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 z-50">
          <button
            onClick={handleEvaluate}
            disabled={!selectedAddress || !selectedCrop}
            className={`w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
              selectedAddress && selectedCrop
                ? 'bg-gradient-to-r from-[#00984f] to-[#00c968] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
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
                navigate('/senior/profile');
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

            {/* AI 분석 과정 - 한 화면에 모두 표시 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">
                  AI가 분석한 과정
                </h3>
                <span className="bg-green-100 text-[#00984f] text-xs px-3 py-1 rounded-full font-semibold">
                  투명한 AI
                </span>
              </div>

              {/* XAI 설명 박스 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">💡</span>
                  <div className="flex-1 text-xs text-yellow-700">
                    <p className="font-semibold mb-1">왜 {selectedCrop || '딸기'} 농장끼리 비교하나요?</p>
                    <p className="text-[11px] leading-relaxed">
                      작물별로 토지 가치, 시설 투자, 수익성이 다르기 때문에 같은 작물끼리 비교해야 정확한 가치를 산정할 수 있어요.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3단계 한번에 표시 */}
              <div className="space-y-4">
                {/* Step 1: 데이터 수집 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-[#00984f] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <h4 className="text-sm font-semibold">데이터 수집</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-[10px] text-gray-600">{selectedCrop || '딸기'} 농장</p>
                      <p className="text-sm font-bold text-[#00984f]">382개</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-[10px] text-gray-600">{(selectedAddress || '충남 논산').split(' ')[1]} 인근</p>
                      <p className="text-sm font-bold">156개</p>
                    </div>
                  </div>
                </div>

                {/* Step 2: 특성 비교 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-[#00984f] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <h4 className="text-sm font-semibold">특성 비교</h4>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: '도로 접근성', score: 95 },
                      { name: '토양 품질', score: 88 },
                      { name: '일조량', score: 92 }
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 w-16">{item.name}</span>
                        <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968]"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#00984f]">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: 가치 산정 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-[#00984f] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <h4 className="text-sm font-semibold">AI 모델 교차검증</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'AI 모델 1', value: '4.18억' },
                      { name: 'AI 모델 2', value: '4.23억' },
                      { name: 'AI 모델 3', value: '4.19억' }
                    ].map((model) => (
                      <div key={model.name} className="bg-white rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-500">{model.name}</p>
                        <p className="text-sm font-bold text-[#00984f]">{model.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-100 rounded-lg p-2 mt-2 text-center">
                    <p className="text-[10px] text-gray-600">최종 예측</p>
                    <p className="text-lg font-bold text-[#00984f]">4.2억원</p>
                  </div>
                </div>
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

            {/* 선택지 버튼 - mode에 따라 다르게 표시 */}
            {isSimpleMode ? (
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/senior/profile')}
                  className="w-full h-14 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                >
                  후계자 매칭 받기
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => {
                    setShowSavedMessage(true);
                    setTimeout(() => {
                      navigate('/');
                    }, 2000);
                  }}
                  className="w-full h-14 bg-white border-2 border-[#00984f] text-[#00984f] rounded-xl font-semibold text-lg"
                >
                  결과만 저장하기
                </button>
                <p className="text-center text-xs text-gray-500">
                  * 저장된 결과는 마이페이지에서 언제든 확인 가능합니다
                </p>
              </div>
            ) : (
              <button
                onClick={() => navigate('/senior/profile')}
                className="w-full h-14 bg-[#00984f] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                최적 후계자 찾기
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 저장 완료 메시지 */}
      {showSavedMessage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-2">평가 결과가 저장되었습니다</p>
            <p className="text-sm text-gray-600">
              마이페이지에서 언제든 확인하실 수 있습니다
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ValueAssessment;