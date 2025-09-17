import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  Check,
  Brain,
  Target,
  Handshake,
  Users,
  Sprout,
  Calendar,
  RefreshCw,
  DollarSign,
  Building2
} from 'lucide-react';

interface Answer {
  [key: number]: string | string[];
}

type PersonaType = '장인적 계승가' | '경험적 사업가' | '데이터 기반 장인' | '혁신적 경영가';

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [persona, setPersona] = useState<PersonaType>('장인적 계승가');

  const totalQuestions = 6;

  const questions = [
    {
      id: 1,
      section: '제2부: 은퇴 및 승계 계획',
      icon: <Target size={32} />,
      title: '농장을 승계할 때\n가장 중요하게 생각하는 것은?',
      subtitle: '농장님의 진솔한 마음을 알려주세요',
      type: 'single',
      options: [
        { value: 'profit', label: '수익성 및 성장성', desc: '최신 기술 도입이나 새로운 판로 개척을 통해 농장의 매출과 가치를 극대화하는 것' },
        { value: 'tradition', label: '계승 및 안정성', desc: '내가 평생 일군 방식과 노하우를 계승하여 우수한 품질을 꾸준히 유지하는 것' },
        { value: 'social', label: '사회적 가치', desc: '친환경/유기농법 등을 통해 지역 사회나 환경에 기여하는 농장으로 남는 것' },
        { value: 'quick', label: '거래의 신속성', desc: '복잡한 것 없이, 신뢰할 수 있는 사람에게 빠르게 넘기는 것' }
      ]
    },
    {
      id: 2,
      section: '제3부: 승계 철학 및 파트너십',
      icon: <Sprout size={32} />,
      title: '농장을 물려받을 사람이\n어떤 목표를 가졌으면 하시나요?',
      subtitle: '사업 운영 방식에 대한 선호도를 알려주세요',
      type: 'single',
      options: [
        { value: 'maintain', label: '안정적 유지', desc: '현재의 안정적인 생산량을 꾸준히 유지했으면 한다' },
        { value: 'growth', label: '기술 도입 성장', desc: '새로운 기술을 도입해 생산량이나 매출을 더 늘렸으면 한다' }
      ]
    },
    {
      id: 3,
      section: '제3부: 승계 철학 및 파트너십',
      icon: <Users size={32} />,
      title: '두 명의 승계 희망자가 있다면\n누구와 먼저 대화하시겠습니까?',
      subtitle: 'SCI의 핵심이 되는 중요한 선택입니다',
      type: 'scenario',
      scenarios: [
        {
          value: 'tech',
          label: '승계자 A',
          title: 'IT 전문가 출신',
          desc: '스마트팜 기술을 도입하여 생산성을 2배로 높이겠다는 구체적인 사업 계획과 투자금을 확보했습니다.\n대표님께는 시장 최고가인 3억 8천만 원을 제안합니다.',
          tags: ['기술 중심', '높은 가격', '혁신']
        },
        {
          value: 'experience',
          label: '승계자 B',
          title: '5년 경력 농업인',
          desc: '다른 농장에서 5년간 일한 경험이 있습니다.\n대표님의 수십 년 재배 노하우와 철학을 그대로 이어받아, 최고의 맛과 품질을 내는 농산물을 생산하고 싶어 합니다.\n3억 5천만 원을 제안합니다.',
          tags: ['경험 중심', '전통 계승', '품질']
        }
      ]
    },
    {
      id: 4,
      section: '제3부: 승계 철학 및 파트너십',
      icon: <Handshake size={32} />,
      title: '승계 완료 후\n농장과의 관계는?',
      subtitle: '멘토십 참여 의향을 알려주세요',
      type: 'single',
      options: [
        { value: 'leave', label: '완전히 떠나고 싶다', desc: '승계 후 모든 것을 후계자에게 맡기고 은퇴' },
        { value: 'sometimes', label: '가끔 방문해서 조언', desc: '필요할 때마다 농장을 방문하여 조언 제공' },
        { value: 'regular', label: '정기적인 자문역', desc: '정기적으로 농장 운영에 대한 자문과 멘토링' }
      ]
    },
    {
      id: 5,
      section: '제4부: 금융 및 기술 활용',
      icon: <DollarSign size={32} />,
      title: '은퇴 후 희망하는\n소득 형태는?',
      subtitle: '재무 조건에 대한 선호도입니다',
      type: 'single',
      options: [
        { value: 'lumpsum', label: '일시불 수령', desc: '매각 대금을 일시에 받아 직접 관리하고 싶다' },
        { value: 'pension', label: '연금형 수령', desc: '농지연금처럼 매월 안정적인 금액을 평생 받고 싶다' }
      ]
    },
    {
      id: 6,
      section: '제4부: 금융 및 기술 활용',
      icon: <Building2 size={32} />,
      title: '농장 관련 상담 시\n주로 이용하는 것은?',
      subtitle: '최대 2개까지 선택해주세요',
      type: 'multiple',
      maxSelect: 2,
      options: [
        { value: 'nh', label: 'NH농협 지점' },
        { value: 'neighbor', label: '주변 농업인' },
        { value: 'family', label: '자녀/가족' },
        { value: 'digital', label: '스마트폰/인터넷' }
      ]
    }
  ];

  const calculatePersona = () => {
    const mainValue = answers[1] as string;
    const businessGoal = answers[2] as string; 
    const successor = answers[3] as string;
    const income = answers[5] as string;

    if (mainValue === 'tradition' && businessGoal === 'maintain' && successor === 'experience') {
      return '장인적 계승가';
    } else if (mainValue === 'profit' && businessGoal === 'growth' && successor === 'tech') {
      return '혁신적 경영가';
    } else if (mainValue === 'tradition' && successor === 'tech') {
      return '데이터 기반 장인';
    } else if (mainValue === 'profit' && successor === 'experience') {
      return '경험적 사업가';
    } else {
      if (mainValue === 'tradition') return '장인적 계승가';
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

  const handleSingleSelect = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelect = (questionId: number, value: string) => {
    const currentAnswers = (answers[questionId] as string[]) || [];
    
    if (currentAnswers.includes(value)) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: currentAnswers.filter(v => v !== value)
      }));
    } else if (currentAnswers.length < 2) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: [...currentAnswers, value]
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedPersona = calculatePersona();
      setPersona(calculatedPersona);
      setShowAnalyzing(true);
      setTimeout(() => {
        setShowAnalyzing(false);
        setShowResult(true);
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = () => {
    return answers[currentQuestion] && 
           (Array.isArray(answers[currentQuestion]) ? 
            (answers[currentQuestion] as string[]).length > 0 : 
            true);
  };

  const currentQ = questions[currentQuestion - 1];
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  if (showAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <Brain size={48} className="text-[#00984f] animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-semibold mb-2">AI가 농장님의 페르소나를 분석 중입니다</h2>
          <p className="text-gray-600">SCI 매칭 알고리즘을 실행하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const personaInfo = getPersonaInfo(persona);
    return (
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold">SCI 매칭 결과</h1>
          </div>
        </header>

        <main className="pt-14 pb-20 px-5">
          <div className="bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-2xl p-8 text-white text-center mb-6 mt-6">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              농장님의 AI 페르소나
            </div>
            <h2 className="text-3xl font-bold mb-3">{persona}</h2>
            <p className="text-base opacity-95 mb-6 whitespace-pre-line">
              {personaInfo.desc}
            </p>
            <div className="flex justify-center gap-3">
              {personaInfo.tags.map((tag, idx) => (
                <span key={idx} className="bg-white/25 px-4 py-2 rounded-full text-sm font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <h3 className="text-base font-semibold mb-4">SCI 기반 AI 매칭 결과</h3>
            <p className="text-sm text-gray-600 mb-4">
              농장님과 가치관이 일치하는 후계자를 찾았습니다
            </p>
            <div className="space-y-3">
              {[
                { name: '김준혁', match: 97, type: persona === '장인적 계승가' ? '장인적 계승가' : '데이터 기반 장인' },
                { name: '이서연', match: 94, type: '데이터 기반 장인' },
                { name: '박민수', match: 91, type: '경험적 사업가' }
              ].map((person, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-green-700">{person.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00984f]">{person.match}%</p>
                    <p className="text-xs text-gray-500">SCI 지수</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold mb-2">SCI 매칭 분석</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-600">농업 철학 (40%)</span>
                <div className="h-2 bg-white rounded-full mt-1">
                  <div className="h-full bg-[#00984f] rounded-full" style={{width: '95%'}} />
                </div>
              </div>
              <div>
                <span className="text-gray-600">사업 방식 (20%)</span>
                <div className="h-2 bg-white rounded-full mt-1">
                  <div className="h-full bg-[#00984f] rounded-full" style={{width: '88%'}} />
                </div>
              </div>
              <div>
                <span className="text-gray-600">멘토십 (20%)</span>
                <div className="h-2 bg-white rounded-full mt-1">
                  <div className="h-full bg-[#00984f] rounded-full" style={{width: '92%'}} />
                </div>
              </div>
              <div>
                <span className="text-gray-600">재무 조건 (20%)</span>
                <div className="h-2 bg-white rounded-full mt-1">
                  <div className="h-full bg-[#00984f] rounded-full" style={{width: '90%'}} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/senior/dashboard')}
            className="w-full h-14 bg-[#00984f] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
          >
            대시보드에서 상세 매칭 확인
            <ChevronRight size={20} />
          </button>
        </main>
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
          <h1 className="text-lg font-semibold">AI 승계 매칭 설문</h1>
        </div>
      </header>

      <main className="pt-14">
        <div className="p-5 bg-white border-b border-gray-100">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm font-semibold text-[#00984f]">
              질문 {currentQuestion} / {totalQuestions}
            </span>
            <span className="text-xs text-gray-500">{currentQ.section}</span>
          </div>
        </div>

        <div className="px-5 pt-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
              {currentQ.icon}
            </div>
            <h2 className="text-2xl font-bold whitespace-pre-line mb-2">{currentQ.title}</h2>
            {currentQ.subtitle && (
              <p className="text-sm text-gray-600">{currentQ.subtitle}</p>
            )}
          </div>

          {currentQ.type === 'single' && (
            <div className="space-y-3">
              {currentQ.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect(currentQuestion, option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                    answers[currentQuestion] === option.value
                      ? 'border-[#00984f] bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-base mb-1">{option.label}</div>
                  {option.desc && (
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  )}
                  {answers[currentQuestion] === option.value && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[#00984f] rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'scenario' && (
            <div className="space-y-4">
              {currentQ.scenarios?.map((scenario) => (
                <button
                  key={scenario.value}
                  onClick={() => handleSingleSelect(currentQuestion, scenario.value)}
                  className={`w-full p-5 rounded-xl border-2 transition-all text-left relative ${
                    answers[currentQuestion] === scenario.value
                      ? 'border-[#00984f] bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-[#00984f]">{scenario.label}</span>
                    <span className="font-bold">{scenario.title}</span>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-line mb-3">
                    {scenario.desc}
                  </div>
                  <div className="flex gap-2">
                    {scenario.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {answers[currentQuestion] === scenario.value && (
                    <div className="absolute top-5 right-5 w-6 h-6 bg-[#00984f] rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'multiple' && (
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options?.map((option) => {
                const selected = ((answers[currentQuestion] as string[]) || []).includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleMultiSelect(currentQuestion, option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-[#00984f] bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    {selected && (
                      <Check size={16} className="text-[#00984f] mt-2 mx-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 flex gap-3 z-10">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 1}
          className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center disabled:opacity-30"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="flex-1 h-12 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-xl font-semibold disabled:from-gray-300 disabled:to-gray-300 flex items-center justify-center gap-2"
        >
          {currentQuestion === totalQuestions ? '완료' : '다음 질문'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Survey;