import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, Save } from 'lucide-react';

interface SurveyData {
  // Section 1
  region?: string;
  crops?: string;
  experience?: string;
  experienceDetail?: string;
  capital?: string;
  // Section 2
  value?: string;
  shortterm?: string;
  // Section 3
  philosophy?: string;
  mentorship?: string;
  // Section 4
  channels?: string[];
  finance?: string;
}

const YouthSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSections = 4;
  const sectionTitles = [
    '제1부: 기본 정보',
    '제2부: 비전 및 사업 계획',
    '제3부: 파트너십 및 멘토십',
    '제4부: 금융 및 정보 활용'
  ];

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      setShowCompletion(true);
    }
  };

  const handlePrev = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('youthSurveyDraft', JSON.stringify(surveyData));
    alert('임시 저장되었습니다.');
  };

  const handleGoToDashboard = () => {
    navigate('/youth/dashboard');
  };

  const progressPercent = (currentSection / totalSections) * 100;

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={60} className="text-white" />
          </div>
          <h1 className="text-[32px] font-bold mb-3">설문이 완료되었습니다!</h1>
          <p className="text-lg text-gray-600 mb-8">
            AI가 답변을 분석하여<br />
            최적의 시니어 농부님을 찾아드릴게요
          </p>
          <button
            onClick={handleGoToDashboard}
            className="w-full max-w-sm px-6 py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl font-bold text-lg"
          >
            매칭 결과 보러가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => currentSection > 1 ? handlePrev() : navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-semibold text-[#00984f]">
            {sectionTitles[currentSection - 1]}
          </span>
          <button onClick={handleSaveDraft} className="text-sm text-gray-600">
            <Save size={20} />
          </button>
        </div>
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-5">
        {/* Section 1: 기본 정보 */}
        {currentSection === 1 && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 text-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                1
              </div>
              <h2 className="text-2xl font-bold mb-2">기본 정보</h2>
              <p className="text-gray-600">귀농 희망 지역과 준비 상황을 알려주세요</p>
            </div>

            {/* Question 1.1 */}
            <div className="bg-white rounded-2xl p-6 mb-5">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 1.1
              </span>
              <h3 className="text-lg font-semibold mb-4">희망하는 귀농 지역과 재배 품목은 무엇인가요?</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">희망 지역</label>
                <input
                  type="text"
                  placeholder="예: 충청북도 충주시"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none"
                  value={surveyData.region || ''}
                  onChange={(e) => setSurveyData({...surveyData, region: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">희망 재배 품목</label>
                <input
                  type="text"
                  placeholder="예: 사과, 포도, 벼"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none"
                  value={surveyData.crops || ''}
                  onChange={(e) => setSurveyData({...surveyData, crops: e.target.value})}
                />
              </div>
            </div>

            {/* Question 1.2 */}
            <div className="bg-white rounded-2xl p-6 mb-5">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 1.2
              </span>
              <h3 className="text-lg font-semibold mb-4">농업 관련 경력이 있으신가요?</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['없음', '1년 미만', '1-3년', '3년 이상'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSurveyData({...surveyData, experience: option})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      surveyData.experience === option
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="font-semibold">{option}</div>
                    <div className="text-xs opacity-80">
                      {option === '없음' && '경력 없음'}
                      {option === '1년 미만' && '초보'}
                      {option === '1-3년' && '경험자'}
                      {option === '3년 이상' && '숙련자'}
                    </div>
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">경력 내용 (선택)</label>
                <textarea
                  placeholder="농업 관련 경험을 자유롭게 작성해주세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-24"
                  value={surveyData.experienceDetail || ''}
                  onChange={(e) => setSurveyData({...surveyData, experienceDetail: e.target.value})}
                />
              </div>
            </div>

            {/* Question 1.3 */}
            <div className="bg-white rounded-2xl p-6">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 1.3
              </span>
              <h3 className="text-lg font-semibold mb-4">현재 확보 가능한 자기 자본 규모는 어느 정도인가요?</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  {value: '5천만원 미만', label: '소규모'},
                  {value: '5천-1억', label: '중규모'},
                  {value: '1-2억', label: '대규모'},
                  {value: '2억 이상', label: '초대규모'}
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, capital: option.value})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      surveyData.capital === option.value
                        ? 'bg-[#00984f] text-white border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="font-semibold">{option.value}</div>
                    <div className="text-xs opacity-80">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: 비전 및 사업 계획 */}
        {currentSection === 2 && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 text-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                2
              </div>
              <h2 className="text-2xl font-bold mb-2">비전 및 사업 계획</h2>
              <p className="text-gray-600">농장 운영에 대한 가치관과 목표를 알려주세요</p>
            </div>

            {/* Question 2.1 */}
            <div className="bg-white rounded-2xl p-6 mb-5">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 2.1
              </span>
              <h3 className="text-lg font-semibold mb-2">농장을 운영하게 된다면, 가장 중요하게 생각하는 가치는 무엇인가요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                [질문의도: 가치관의 핵심 파악] 1개만 선택해주세요
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    value: 'profit',
                    title: '수익성 및 성장성',
                    desc: '최신 기술을 도입하여 수익을 극대화하는 사업가형 농업'
                  },
                  {
                    value: 'tradition',
                    title: '계승 및 안정성',
                    desc: '기존 농장의 역사와 철학을 계승하여 명품 브랜드를 만드는 장인형 농업'
                  },
                  {
                    value: 'social',
                    title: '사회적 가치',
                    desc: '친환경/유기농법으로 사회적 가치를 실현하는 농업'
                  },
                  {
                    value: 'stable',
                    title: '안정적 운영',
                    desc: '리스크를 최소화하며 안정적인 소득을 만드는 것을 최우선으로 하는 농업'
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, value: option.value})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      surveyData.value === option.value
                        ? 'bg-green-50 border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        surveyData.value === option.value
                          ? 'border-[#00984f]'
                          : 'border-gray-300'
                      }`}>
                        {surveyData.value === option.value && (
                          <div className="w-2.5 h-2.5 bg-[#00984f] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <strong className="block mb-1">{option.title}</strong>
                        <span className="text-sm text-gray-600">{option.desc}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2.2 */}
            <div className="bg-white rounded-2xl p-6">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 2.2
              </span>
              <h3 className="text-lg font-semibold mb-2">농장 인수 후 단기적인 목표는 무엇인가요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                [질문의도: 사업 운영 방식 선호도]
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    value: 'learn',
                    desc: '우선 1~2년간은 기존 방식을 배우며 안정적으로 운영하는 것'
                  },
                  {
                    value: 'innovate',
                    desc: '1년 내에 새로운 판로를 개척하거나 스마트팜 설비를 도입하여 매출을 끌어올리는 것'
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, shortterm: option.value})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      surveyData.shortterm === option.value
                        ? 'bg-green-50 border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        surveyData.shortterm === option.value
                          ? 'border-[#00984f]'
                          : 'border-gray-300'
                      }`}>
                        {surveyData.shortterm === option.value && (
                          <div className="w-2.5 h-2.5 bg-[#00984f] rounded-full" />
                        )}
                      </div>
                      <span className="text-[15px]">{option.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: 파트너십 및 멘토십 */}
        {currentSection === 3 && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 text-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                3
              </div>
              <h2 className="text-2xl font-bold mb-2">파트너십 및 멘토십</h2>
              <p className="text-gray-600">시니어 농부와의 관계 설정 방식을 알려주세요</p>
            </div>

            {/* Question 3.1 */}
            <div className="bg-white rounded-2xl p-6 mb-5">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 3.1
              </span>
              <h3 className="text-lg font-semibold mb-2">기존에 농장을 운영하시던 분의 철학과 노하우를 어떻게 생각하시나요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                [질문의도: SCI의 '농업 철학' 차원 데이터]
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    value: 'respect_but',
                    desc: '존중하지만, 사업 성공을 위해선 나의 새로운 방식이 더 중요하다고 생각한다'
                  },
                  {
                    value: 'inherit',
                    desc: '수십 년의 경험은 돈으로 살 수 없는 자산이므로, 최대한 배우고 계승하고 싶다'
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, philosophy: option.value})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      surveyData.philosophy === option.value
                        ? 'bg-green-50 border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        surveyData.philosophy === option.value
                          ? 'border-[#00984f]'
                          : 'border-gray-300'
                      }`}>
                        {surveyData.philosophy === option.value && (
                          <div className="w-2.5 h-2.5 bg-[#00984f] rounded-full" />
                        )}
                      </div>
                      <span className="text-[15px]">{option.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3.2 */}
            <div className="bg-white rounded-2xl p-6">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 3.2
              </span>
              <h3 className="text-lg font-semibold mb-2">성공적인 정착을 위해, 기존 농장주로부터 어떤 도움을 받고 싶으신가요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                [질문의도: SCI의 '멘토십' 차원 데이터]
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    value: 'minimal',
                    desc: '인수인계 과정만 명확하면 충분하다'
                  },
                  {
                    value: 'ongoing',
                    desc: '정착 초기 몇 년간은 지속적인 조언과 도움이 필요하다'
                  },
                  {
                    value: 'partner',
                    desc: '동업자처럼 함께 논의하며 배우고 싶다'
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, mentorship: option.value})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      surveyData.mentorship === option.value
                        ? 'bg-green-50 border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        surveyData.mentorship === option.value
                          ? 'border-[#00984f]'
                          : 'border-gray-300'
                      }`}>
                        {surveyData.mentorship === option.value && (
                          <div className="w-2.5 h-2.5 bg-[#00984f] rounded-full" />
                        )}
                      </div>
                      <span className="text-[15px]">{option.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 4: 금융 및 정보 활용 */}
        {currentSection === 4 && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 text-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                4
              </div>
              <h2 className="text-2xl font-bold mb-2">금융 및 정보 활용</h2>
              <p className="text-gray-600">정보 획득 방식과 자금 조달 계획을 알려주세요</p>
            </div>

            {/* Question 4.1 */}
            <div className="bg-white rounded-2xl p-6 mb-5">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 4.1
              </span>
              <h3 className="text-lg font-semibold mb-2">귀농/승계 정보를 얻을 때, 가장 신뢰하는 채널은 무엇인가요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                2개를 선택해주세요
              </p>
              
              <div className="space-y-3">
                {[
                  {value: 'government', label: '정부/지자체 사이트'},
                  {value: 'online', label: '온라인 커뮤니티/유튜브'},
                  {value: 'local', label: '지역 농협/농업기술센터'},
                  {value: 'senior', label: '먼저 귀농한 선배/지인'}
                ].map((option) => {
                  const isSelected = surveyData.channels?.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = surveyData.channels || [];
                        if (isSelected) {
                          setSurveyData({
                            ...surveyData,
                            channels: current.filter(c => c !== option.value)
                          });
                        } else if (current.length < 2) {
                          setSurveyData({
                            ...surveyData,
                            channels: [...current, option.value]
                          });
                        } else {
                          alert('최대 2개까지 선택 가능합니다.');
                        }
                      }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'bg-green-50 border-[#00984f]'
                          : 'bg-white border-gray-200 hover:border-[#00984f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#00984f] border-[#00984f]'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                        <span className="text-[15px]">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 4.2 */}
            <div className="bg-white rounded-2xl p-6">
              <span className="inline-block bg-green-100 text-[#00984f] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                질문 4.2
              </span>
              <h3 className="text-lg font-semibold mb-2">농장 인수 자금 조달 시, 선호하는 방식은 무엇인가요?</h3>
              <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-[#00984f] px-4 py-3 mb-4">
                [질문의도: SCI의 '재무 조건' 차원 데이터]
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    value: 'selfcapital',
                    title: '안정성 추구',
                    desc: '자기 자본 비중을 높여 금융 부담을 최소화하고 싶다'
                  },
                  {
                    value: 'leverage',
                    title: '성장성 추구',
                    desc: '정책자금 등 레버리지를 적극 활용하여 더 큰 규모의 농장을 인수하고 싶다'
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSurveyData({...surveyData, finance: option.value})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      surveyData.finance === option.value
                        ? 'bg-green-50 border-[#00984f]'
                        : 'bg-white border-gray-200 hover:border-[#00984f]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        surveyData.finance === option.value
                          ? 'border-[#00984f]'
                          : 'border-gray-300'
                      }`}>
                        {surveyData.finance === option.value && (
                          <div className="w-2.5 h-2.5 bg-[#00984f] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <strong className="block mb-1">{option.title}</strong>
                        <span className="text-sm text-gray-600">{option.desc}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 flex gap-3 z-50">
        {currentSection > 1 && (
          <button
            onClick={handlePrev}
            className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold"
          >
            이전
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1 py-3.5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold"
        >
          {currentSection === totalSections ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default YouthSurvey;