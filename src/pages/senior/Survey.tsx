import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  Check,
  Brain,
  MapPin,
  Target,
  Handshake,
  DollarSign
} from 'lucide-react';

interface Answer {
  [key: string]: string | string[] | undefined;
}

type PersonaType = '장인적 계승가' | '경험적 사업가' | '데이터 기반 장인' | '혁신적 경영가';

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [persona, setPersona] = useState<PersonaType>('장인적 계승가');

  const totalSections = 4;

  const sections = [
    {
      id: 1,
      title: '농장 기본 정보',
      subtitle: '농장의 기본 정보를 입력해주세요',
      icon: <MapPin size={32} className="text-[#00984f]" />,
      label: '기본정보'
    },
    {
      id: 2,
      title: '은퇴 및 승계 계획',
      subtitle: '농장 승계에 대한 계획을 알려주세요',
      icon: <Target size={32} className="text-[#00984f]" />,
      label: '승계계획'
    },
    {
      id: 3,
      title: '승계 철학 및 파트너십',
      subtitle: '후계자에 대한 생각을 들려주세요',
      icon: <Handshake size={32} className="text-[#00984f]" />,
      label: '철학/파트너십'
    },
    {
      id: 4,
      title: '금융 및 기술 활용',
      subtitle: '선호하는 금융 조건을 알려주세요',
      icon: <DollarSign size={32} className="text-[#00984f]" />,
      label: '금융/기술'
    }
  ];

  const calculatePersona = () => {
    const mainValue = answers.value;
    const goal = answers.goal; 
    const scenario = answers.scenario;

    if (mainValue === 'succession' && goal === 'stable' && scenario === 'B') {
      return '장인적 계승가';
    } else if (mainValue === 'profit' && goal === 'growth' && scenario === 'A') {
      return '혁신적 경영가';
    } else if (mainValue === 'succession' && scenario === 'A') {
      return '데이터 기반 장인';
    } else if (mainValue === 'profit' && scenario === 'B') {
      return '경험적 사업가';
    } else {
      if (mainValue === 'succession') return '장인적 계승가';
      if (mainValue === 'profit') return '경험적 사업가';
      return '장인적 계승가';
    }
  };

  const getPersonaInfo = (type: PersonaType) => {
    const personas = {
      '장인적 계승가': {
        desc: '전통과 품질을 중시하며\n후계자에게 철학을 전수하는 농장주',
        tags: ['전통계승', '품질우선', '멘토십']
      },
      '경험적 사업가': {
        desc: '경험과 수완으로 사업을 확장하며\n실용적 가치를 추구하는 농장주',
        tags: ['사업수완', '실용주의', '확장성']
      },
      '데이터 기반 장인': {
        desc: '기술과 데이터로 품질을 극대화하며\n스마트한 농업을 추구하는 농장주',
        tags: ['정밀농업', '데이터활용', '품질극대화']
      },
      '혁신적 경영가': {
        desc: '첨단 기술로 미래 농업을 선도하며\n수익 극대화를 추구하는 농장주',
        tags: ['기술혁신', '수익극대화', '성장추구']
      }
    };
    return personas[type];
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleButtonSelect = (field: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxToggle = (field: string, value: string) => {
    const current = (answers[field] as string[]) || [];
    if (current.includes(value)) {
      setAnswers(prev => ({
        ...prev,
        [field]: current.filter(v => v !== value)
      }));
    } else if (current.length < 2) {
      setAnswers(prev => ({
        ...prev,
        [field]: [...current, value]
      }));
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
    } else {
      const calculatedPersona = calculatePersona();
      setPersona(calculatedPersona);
      setShowAnalyzing(true);
      setTimeout(() => {
        navigate('/senior/dashboard', { 
          state: { persona: calculatedPersona } 
        });
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isCurrentSectionValid = () => {
    switch(currentSection) {
      case 1:
        return answers.crop && answers.experience;
      case 2:
        return answers.timeline && answers.value;
      case 3:
        return answers.goal && answers.scenario && answers.mentorship;
      case 4:
        return answers.channels && (answers.channels as string[]).length > 0 && answers.income;
      default:
        return false;
    }
  };

  if (showAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <Brain size={48} className="text-[#00984f] animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-semibold mb-2">AI가 농장님의 페르소나를 분석 중입니다</h2>
          <p className="text-gray-600">SCI 지수를 계산하고 있어요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">AI 매칭 설문</h1>
        </div>
      </header>

      <main className="pt-14">
        <div className="p-5 bg-white border-b border-gray-100">
          <div className="flex justify-between mb-4">
            {sections.map((section) => (
              <div 
                key={section.id}
                className={`flex-1 text-center relative ${
                  section.id < currentSection ? 'after:bg-[#00984f]' : 'after:bg-gray-200'
                } ${section.id < totalSections ? "after:content-[''] after:absolute after:top-[15px] after:left-[50%] after:w-full after:h-[2px] after:z-0" : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 relative z-10 text-sm font-semibold ${
                  section.id === currentSection 
                    ? 'bg-[#00984f] text-white' 
                    : section.id < currentSection 
                      ? 'bg-[#00984f] text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {section.id < currentSection ? <Check size={16} /> : section.id}
                </div>
                <div className={`text-xs ${
                  section.id === currentSection ? 'text-[#00984f] font-semibold' : 'text-gray-500'
                }`}>
                  {section.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-6">
          <h2 className="text-2xl font-bold mb-2">{sections[currentSection - 1].title}</h2>
          <p className="text-sm text-gray-600 mb-8">{sections[currentSection - 1].subtitle}</p>

          {currentSection === 1 && (
            <>
              <div className="mb-8">
                <label className="text-base font-semibold mb-3 block">
                  주로 재배하는 품목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 사과, 배, 딸기 등"
                  value={(answers.crop as string) || ''}
                  onChange={(e) => handleInputChange('crop', e.target.value)}
                  className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00984f]"
                />
              </div>

              <div className="mb-8">
                <label className="text-base font-semibold mb-3 block">
                  농장 운영 기간 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['5년 미만', '5~10년', '10~20년', '20년 이상'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleButtonSelect('experience', option)}
                      className={`py-4 px-4 rounded-xl border-2 font-medium transition-all ${
                        answers.experience === option
                          ? 'border-[#00984f] bg-green-50 text-[#00984f]'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentSection === 2 && (
            <>
              <div className="mb-8">
                <label className="text-base font-semibold mb-3 block">
                  희망 승계 시기 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '1year', label: '1년 내' },
                    { value: '3years', label: '1~3년' },
                    { value: '5years', label: '3~5년' },
                    { value: 'undecided', label: '미정' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleButtonSelect('timeline', option.value)}
                      className={`py-4 px-4 rounded-xl border-2 font-medium transition-all ${
                        answers.timeline === option.value
                          ? 'border-[#00984f] bg-green-50 text-[#00984f]'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  농장 승계 시 가장 중요한 가치 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">[핵심 가치관]</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'profit', title: '수익성 및 성장성', desc: '최신 기술 도입이나 새로운 판로 개척을 통해 농장의 매출과 가치를 극대화하는 것' },
                    { value: 'succession', title: '계승 및 안정성', desc: '내가 평생 일군 방식과 노하우를 계승하여 우수한 품질을 꾸준히 유지하는 것' },
                    { value: 'social', title: '사회적 가치', desc: '친환경/유기농법 등을 통해 지역 사회나 환경에 기여하는 농장으로 남는 것' },
                    { value: 'quick', title: '거래의 신속성', desc: '복잡한 것 없이, 신뢰할 수 있는 사람에게 빠르게 넘기는 것' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleButtonSelect('value', option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                        answers.value === option.value
                          ? 'border-[#00984f] bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          answers.value === option.value
                            ? 'border-[#00984f] bg-[#00984f]'
                            : 'border-gray-300'
                        }`}>
                          {answers.value === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-base mb-1">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentSection === 3 && (
            <>
              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  후계자의 운영 목표 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">[운영 방식]</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'stable', title: '안정적 유지', desc: '현재의 안정적인 생산량을 꾸준히 유지했으면 한다' },
                    { value: 'growth', title: '성장과 혁신', desc: '새로운 기술을 도입해 생산량이나 매출을 더 늘렸으면 한다' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleButtonSelect('goal', option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                        answers.goal === option.value
                          ? 'border-[#00984f] bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          answers.goal === option.value
                            ? 'border-[#00984f] bg-[#00984f]'
                            : 'border-gray-300'
                        }`}>
                          {answers.goal === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-base mb-1">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  승계 희망자 선택 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">[AI 매칭 핵심]</span>
                </label>
                <p className="text-sm text-gray-600 mb-4">다음 두 승계자 중 누구와 먼저 대화하시겠습니까?</p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handleButtonSelect('scenario', 'A')}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      answers.scenario === 'A'
                        ? 'border-[#00984f] bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                        💻
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">승계자 A</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            answers.scenario === 'A' ? 'bg-[#00984f] text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            IT 전문가
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          IT 전문가 출신으로, 스마트팜 기술을 도입하여 생산성을 2배로 높이겠다는 구체적인 사업 계획과 투자금을 확보했습니다.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#00984f]">
                          <span>💰</span>
                          <span>제안가: 3억 8천만원</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleButtonSelect('scenario', 'B')}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      answers.scenario === 'B'
                        ? 'border-[#00984f] bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                        🌾
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">승계자 B</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            answers.scenario === 'B' ? 'bg-[#00984f] text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            경험자
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          다른 농장에서 5년간 일한 경험이 있습니다. 대표님의 수십 년 재배 노하우와 철학을 그대로 이어받아, 최고의 맛과 품질을 내는 작물을 생산하고 싶어합니다.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#00984f]">
                          <span>💰</span>
                          <span>제안가: 3억 5천만원 (정책 대출 활용)</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  승계 후 관계 유지 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">[멘토십]</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'none', title: '완전히 떠나고 싶다' },
                    { value: 'occasional', title: '가끔 방문해서 조언해주고 싶다' },
                    { value: 'regular', title: '정기적인 자문역을 맡고 싶다' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleButtonSelect('mentorship', option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                        answers.mentorship === option.value
                          ? 'border-[#00984f] bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          answers.mentorship === option.value
                            ? 'border-[#00984f] bg-[#00984f]'
                            : 'border-gray-300'
                        }`}>
                          {answers.mentorship === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="font-semibold text-base">{option.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentSection === 4 && (
            <>
              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  농장 관련 상담 채널 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">(2개 선택)</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'nh', label: '지역 농협(NH농협은행) 지점 직원' },
                    { value: 'neighbor', label: '주변 농업인 동료' },
                    { value: 'family', label: '자녀/가족' },
                    { value: 'digital', label: '스마트폰/인터넷' }
                  ].map((option) => {
                    const selected = ((answers.channels as string[]) || []).includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleCheckboxToggle('channels', option.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selected
                            ? 'border-[#00984f] bg-green-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                            selected
                              ? 'border-[#00984f] bg-[#00984f]'
                              : 'border-gray-300'
                          }`}>
                            {selected && <Check size={12} className="text-white" />}
                          </div>
                          <span className="text-base">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-base font-semibold mb-2 block">
                  은퇴 후 희망 소득 형태 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 font-normal ml-2">[재무 조건]</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'lump', title: '일시불 수령', desc: '매각 대금을 일시에 받아 직접 관리하고 싶다' },
                    { value: 'pension', title: '연금형 수령', desc: '농지연금처럼 매월 안정적인 금액을 평생 받고 싶다' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleButtonSelect('income', option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                        answers.income === option.value
                          ? 'border-[#00984f] bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          answers.income === option.value
                            ? 'border-[#00984f] bg-[#00984f]'
                            : 'border-gray-300'
                        }`}>
                          {answers.income === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-base mb-1">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 flex gap-3 z-10">
        <button
          onClick={handlePrev}
          disabled={currentSection === 1}
          className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center disabled:opacity-30"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentSectionValid()}
          className="flex-1 h-12 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold disabled:from-gray-300 disabled:to-gray-300 flex items-center justify-center gap-2"
        >
          {currentSection === totalSections ? '분석 시작' : '다음 단계'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Survey;