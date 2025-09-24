import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Check,
  Upload,
  Calendar,
  FileText,
  Phone,
  ChevronRight,
  AlertCircle,
  Shield,
  TrendingUp,
  DollarSign,
  Building,
  Scale
} from 'lucide-react';

interface Document {
  id: number;
  name: string;
  icon: string;
  status: 'uploaded' | 'pending';
}

interface ScheduleItem {
  month: string;
  day: string;
  title: string;
  description: string;
  participants: string[];
  avatars: string[];
}

interface TermItem {
  label: string;
  value: string;
}

const Partnership: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const documents: Document[] = [
    { id: 1, name: '농장 등기부', icon: '📄', status: 'uploaded' },
    { id: 2, name: '매출 증빙', icon: '💰', status: 'uploaded' },
    { id: 3, name: '농지원부', icon: '🏦', status: 'pending' },
    { id: 4, name: '사업계획서', icon: '📊', status: 'pending' },
    { id: 5, name: '신용정보', icon: '💳', status: 'pending' },
    { id: 6, name: '신분증', icon: '🆔', status: 'uploaded' }
  ];

  const schedules: ScheduleItem[] = [
    {
      month: '1월',
      day: '25',
      title: 'NH 전문가 상담',
      description: '승계 조건 및 금융 상품 안내',
      participants: ['김영철', '이준혁', 'NH담당자'],
      avatars: ['👨‍🌾', '👨‍🌾', '🏦']
    },
    {
      month: '2월',
      day: '5',
      title: '2차 농장 방문',
      description: '세부 시설 점검 및 인수인계 항목 확인',
      participants: ['김영철', '이준혁'],
      avatars: ['👨‍🌾', '👨‍🌾']
    },
    {
      month: '2월',
      day: '15',
      title: '계약서 초안 검토',
      description: '법무 검토 후 최종 계약 조건 확정',
      participants: ['NH 법무팀 검토'],
      avatars: ['⚖️']
    }
  ];

  const terms: TermItem[] = [
    { label: '승계 방식', value: '단계적 승계 (3년)' },
    { label: '농장 가치', value: '4.2억원' },
    { label: '초기 지분', value: '30% (1.26억)' },
    { label: '멘토링 기간', value: '1년 (월 2회)' },
    { label: '농지 임대', value: '5년 장기임대' }
  ];

  const supportServices = [
    { id: 'loan', icon: '💰', name: '승계 자금', desc: '최대 3억, 1.5%' },
    { id: 'pension', icon: '🏦', name: '농지연금', desc: '월 150만원' },
    { id: 'legal', icon: '⚖️', name: '법률 지원', desc: '무료 상담' },
    { id: 'tax', icon: '📊', name: '세무 상담', desc: '절세 방안' }
  ];

  const steps = [
    { label: '매칭', completed: true },
    { label: '상담', completed: true },
    { label: '협의', active: true },
    { label: '계약', pending: true },
    { label: '승계', pending: true }
  ];

  const currentTasks = [
    { completed: true, text: '첫 만남 완료' },
    { completed: true, text: '농장 현장 방문' },
    { completed: false, text: '승계 조건 협의서 작성' },
    { completed: false, text: 'NH 전문가 상담' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(40);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDocumentUpload = () => {
    alert('서류 업로드 화면으로 이동합니다');
  };

  const handleSupportService = (service: string) => {
    const services: { [key: string]: string } = {
      loan: '승계자금 대출 상품 안내',
      pension: '농지연금 상품 안내',
      legal: '법률 지원 서비스',
      tax: '세무 상담 서비스'
    };
    alert(services[service] + ' 페이지로 이동합니다');
  };

  const handleNextStep = () => {
    if (confirm('다음 단계로 진행하시겠습니까?\n필요 서류를 모두 준비해주세요.')) {
      alert('NH 담당자가 확인 후 연락드리겠습니다');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">파트너십 관리</h1>
        </div>
        <button className="px-4 py-2 bg-[#00984f] text-white rounded-full text-sm font-semibold">
          가이드
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-[60px] pb-20">
        {/* Partnership Header */}
        <section className="bg-gradient-to-br from-[#00984f] to-[#00c968] px-5 py-6 text-white">
          <span className="inline-block bg-white/20 px-3 py-1 rounded-xl text-xs font-semibold mb-3">
            진행중
          </span>
          <h2 className="text-2xl font-bold mb-3">농장 승계 파트너십</h2>
          <div className="flex items-center justify-around bg-white/15 backdrop-blur rounded-2xl p-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                👨‍🌾
              </div>
              <p className="text-sm font-semibold">김영철</p>
              <p className="text-xs opacity-90">시니어 농부</p>
            </div>
            <span className="text-2xl">🤝</span>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                👨‍🌾
              </div>
              <p className="text-sm font-semibold">이준혁</p>
              <p className="text-xs opacity-90">청년 농부</p>
            </div>
          </div>
        </section>

        {/* Progress Card */}
        <section className="mx-5 -mt-4 mb-5 bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold">전체 진행률</h3>
            <span className="text-2xl font-bold text-[#00984f]">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00984f] to-[#00c968] rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex justify-between mb-5">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold ${
                  step.completed 
                    ? 'bg-[#00984f] text-white' 
                    : step.active 
                    ? 'bg-green-100 text-[#00984f] border-3 border-[#00984f]' 
                    : 'bg-gray-100 text-gray-400 border-3 border-gray-200'
                }`}>
                  {step.completed ? <Check size={16} /> : index + 1}
                </div>
                <p className={`text-xs ${step.active ? 'text-[#00984f] font-semibold' : 'text-gray-600'}`}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {/* Current Stage */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-[#00984f] rounded-lg flex items-center justify-center text-white">
                <FileText size={18} />
              </div>
              <div>
                <p className="font-semibold">조건 협의 단계</p>
                <p className="text-xs text-gray-600">예상 완료: 2025년 2월 15일</p>
              </div>
            </div>
            <div className="space-y-2">
              {currentTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-[#00984f] border-[#00984f] text-white' 
                      : 'border-gray-300'
                  }`}>
                    {task.completed && <Check size={12} />}
                  </div>
                  <span className={task.completed ? 'text-gray-600' : 'text-gray-800'}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alert Banner */}
        <div className="mx-5 mb-5 bg-green-50 border-l-4 border-[#00984f] rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertCircle className="text-[#00984f]" size={20} />
          <div className="flex-1">
            <p className="text-sm">
              <strong>다음 일정:</strong> 1월 25일 NH농협 전문가 상담
            </p>
          </div>
          <ChevronRight size={16} className="text-[#00984f]" />
        </div>

        {/* Documents Section */}
        <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">필요 서류</h3>
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              3개 남음
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={doc.status === 'pending' ? handleDocumentUpload : undefined}
                className={`relative p-4 rounded-xl text-center transition-all ${
                  doc.status === 'uploaded' 
                    ? 'bg-green-50 border-2 border-[#00984f]' 
                    : 'bg-gray-50 border-2 border-gray-200 active:scale-95'
                }`}
              >
                {doc.status === 'uploaded' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#00984f] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
                <div className="text-3xl mb-2">{doc.icon}</div>
                <p className="text-sm font-semibold">{doc.name}</p>
                <p className={`text-xs mt-1 ${
                  doc.status === 'uploaded' ? 'text-[#00984f] font-semibold' : 'text-gray-600'
                }`}>
                  {doc.status === 'uploaded' ? '업로드 완료' : '업로드 필요'}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <h3 className="text-lg font-bold mb-4">주요 일정</h3>
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-center w-14">
                  <p className="text-xs text-gray-500">{schedule.month}</p>
                  <p className="text-xl font-bold">{schedule.day}</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3">
                  <p className="font-semibold text-[15px] mb-1">{schedule.title}</p>
                  <p className="text-xs text-gray-600 mb-2">{schedule.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {schedule.avatars.map((avatar, i) => (
                        <div 
                          key={i} 
                          className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] border border-gray-200"
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {schedule.participants.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Terms Section */}
        <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <h3 className="text-lg font-bold mb-4">협의된 조건</h3>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                📝
              </div>
              <p className="font-semibold">주요 승계 조건</p>
            </div>
            <div className="space-y-3">
              {terms.map((term, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">{term.label}</span>
                  <span className="text-sm font-semibold">{term.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NH Support Services */}
        <section className="bg-white px-5 py-5">
          <h3 className="text-lg font-bold mb-4">NH 지원 서비스</h3>
          <div className="grid grid-cols-2 gap-3">
            {supportServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleSupportService(service.id)}
                className="bg-gray-50 rounded-xl p-4 text-center hover:bg-[#00984f] hover:text-white transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <p className="text-sm font-semibold">{service.name}</p>
                <p className="text-xs opacity-80">{service.desc}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-5 flex flex-col gap-3">
        <button 
          onClick={() => alert('NH농협 승계지원센터\n☎ 1588-2100')}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Phone size={24} className="text-gray-700" />
        </button>
        <button 
          onClick={handleNextStep}
          className="w-14 h-14 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full shadow-lg flex items-center justify-center text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Partnership;