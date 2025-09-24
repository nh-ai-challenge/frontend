import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Car,
  Building,
  Calendar,
  Heart,
  Check,
  Shield,
  MessageSquare
} from 'lucide-react';

interface TimelineItem {
  id: number;
  status: 'completed' | 'active' | 'pending';
  title: string;
  desc: string;
  date?: string;
}

const Connection: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [sentGreetings, setSentGreetings] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    { id: 1, status: 'completed', title: 'AI 매칭 완료', desc: '97점 최고 매칭', date: '1월 14일' },
    { id: 2, status: 'active', title: '첫 연결 대기중', desc: '전화 또는 인사를 보내주세요' },
    { id: 3, status: 'pending', title: '농장 방문', desc: '직접 만나서 상담' },
    { id: 4, status: 'pending', title: '계약 진행', desc: 'NH농협이 도와드립니다' }
  ]);

  const candidate = {
    name: '이준혁',
    age: 32,
    avatar: '👨‍🌾',
    location: '충북 충주',
    experience: '5년 경력',
    persona: '장인적 계승가',
    tags: ['사과 재배', '농대 졸업'],
    sciScore: 97
  };

  const greetings = [
    {
      id: 1,
      emoji: '👋',
      text: '안녕하세요, 이준혁님. 프로필 잘 봤습니다.\n한번 만나서 이야기 나누고 싶네요.'
    },
    {
      id: 2,
      emoji: '🌾',
      text: '농장을 한번 구경하러 오세요.\n직접 보시면 더 좋을 것 같습니다.'
    },
    {
      id: 3,
      emoji: '☕',
      text: '시간 되실 때 차 한잔 하면서\n농장 이야기를 나눠보면 좋겠습니다.'
    }
  ];

  const dates = [
    { day: '월', date: '20' },
    { day: '화', date: '21' },
    { day: '수', date: '22' },
    { day: '목', date: '23' },
    { day: '금', date: '24' },
    { day: '토', date: '25' }
  ];

  const handleSendGreeting = (greetingId: number) => {
    if (sentGreetings.includes(greetingId)) {
      alert('이미 전송된 인사입니다');
      return;
    }

    setSentGreetings([...sentGreetings, greetingId]);
    
    // Update timeline
    const updatedTimeline = [...timeline];
    const activeIndex = updatedTimeline.findIndex(item => item.status === 'active');
    if (activeIndex !== -1) {
      updatedTimeline[activeIndex] = {
        ...updatedTimeline[activeIndex],
        status: 'completed',
        title: '첫 인사 완료',
        desc: '인사를 보냈습니다',
        date: '오늘'
      };
      if (activeIndex + 1 < updatedTimeline.length) {
        updatedTimeline[activeIndex + 1].status = 'active';
      }
    }
    setTimeline(updatedTimeline);

    alert('인사를 보냈습니다! 이준혁님이 확인하면 알려드릴게요.');
  };

  const handleMakeCall = () => {
    setShowCallModal(true);
  };

  const confirmCall = () => {
    setShowCallModal(false);
    window.location.href = 'tel:050-1234-5678';
  };

  const handleRequestVisit = () => {
    const visitSection = document.getElementById('visit-section');
    visitSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNHMeeting = () => {
    alert('NH 담당자가 곧 연락드리겠습니다.\n평일 기준 1-2일 이내 연락드립니다.');
  };

  const handleSendVisitRequest = () => {
    if (!selectedDate) {
      alert('방문 희망 날짜를 선택해주세요');
      return;
    }
    setShowVisitModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white flex items-center justify-between px-4 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">연결하기</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[60px] pb-5">
        {/* Profile Section */}
        <section className="bg-white px-5 py-6 text-center border-b-8 border-gray-50">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
            {candidate.avatar}
          </div>
          <h2 className="text-[28px] font-bold mb-2">{candidate.name}님</h2>
          <p className="text-base text-gray-600 mb-4">
            {candidate.age}세 · {candidate.location} · {candidate.experience}
          </p>
          <div className="flex justify-center gap-2 mb-5">
            <span className="px-3 py-1.5 bg-gray-100 rounded-2xl text-sm text-gray-700">
              🌟 {candidate.persona}
            </span>
            {candidate.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-2xl text-sm text-gray-700">
                {tag}
              </span>
            ))}
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 inline-flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div className="text-left">
              <p className="text-sm text-gray-600">AI 매칭 지수</p>
              <div>
                <span className="text-3xl font-bold text-[#00984f]">{candidate.sciScore}점</span>
                <span className="ml-2 inline-block bg-[#00984f] text-white px-3 py-1 rounded-xl text-xs font-semibold">
                  최고 매칭
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Actions */}
        <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <h3 className="text-lg font-bold mb-4">바로 연결하기</h3>
          
          <button 
            onClick={handleMakeCall}
            className="w-full p-5 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl mb-3 flex items-center gap-3"
          >
            <Phone size={28} />
            <div className="text-left">
              <p className="text-xl font-bold">전화 연결하기</p>
              <p className="text-sm opacity-90">NH 안심번호로 안전하게</p>
            </div>
          </button>

          <button 
            onClick={handleRequestVisit}
            className="w-full p-5 bg-white border-[3px] border-[#00984f] text-[#00984f] rounded-2xl mb-3 flex items-center gap-3"
          >
            <Car size={28} />
            <div className="text-left">
              <p className="text-xl font-bold">농장 방문 신청</p>
              <p className="text-sm">원하는 날짜 선택</p>
            </div>
          </button>

          <button 
            onClick={handleNHMeeting}
            className="w-full p-5 bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-2xl flex items-center gap-3"
          >
            <Building size={28} />
            <div className="text-left">
              <p className="text-lg font-bold">NH 담당자와 3자 통화</p>
              <p className="text-sm">전문 상담사가 함께합니다</p>
            </div>
          </button>
        </section>

        {/* Quick Greetings */}
        <section className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <h3 className="text-lg font-bold mb-2">간편 인사 보내기</h3>
          <p className="text-sm text-gray-600 mb-4">탭해서 바로 전송할 수 있어요</p>
          
          <div className="space-y-3">
            {greetings.map((greeting) => (
              <button
                key={greeting.id}
                onClick={() => handleSendGreeting(greeting.id)}
                className={`w-full bg-gray-50 border-2 rounded-xl p-4 text-left transition-all relative ${
                  sentGreetings.includes(greeting.id) 
                    ? 'border-gray-200 opacity-60' 
                    : 'border-gray-200 hover:border-[#00984f] hover:bg-green-50'
                }`}
                disabled={sentGreetings.includes(greeting.id)}
              >
                <div className="text-2xl mb-2">{greeting.emoji}</div>
                <p className="text-base text-gray-700 whitespace-pre-line">{greeting.text}</p>
                <p className="text-xs text-[#00984f] font-semibold mt-2">
                  {sentGreetings.includes(greeting.id) ? '✓ 전송됨' : '탭해서 보내기'}
                </p>
                {sentGreetings.includes(greeting.id) && (
                  <div className="absolute top-4 right-4 bg-[#00984f] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    ✓ 전송됨
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Visit Schedule */}
        <section id="visit-section" className="bg-white px-5 py-5 border-b-8 border-gray-50">
          <h3 className="text-lg font-bold mb-2">방문 가능한 날짜</h3>
          <p className="text-sm text-gray-600 mb-4">농장 방문이 가능한 날을 선택해주세요</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3 text-base font-semibold">
              <Calendar size={20} />
              <span>1월 넷째 주</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {dates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => setSelectedDate(date.date)}
                  className={`bg-white border-2 rounded-lg py-3 text-center transition-all ${
                    selectedDate === date.date
                      ? 'border-[#00984f] bg-[#00984f] text-white'
                      : 'border-gray-200 hover:border-[#00984f]'
                  }`}
                >
                  <p className="text-xs opacity-80 mb-1">{date.day}</p>
                  <p className="text-lg font-bold">{date.date}</p>
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleSendVisitRequest}
            className="w-full py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold"
          >
            선택한 날짜로 방문 요청 보내기
          </button>
        </section>

        {/* Progress Timeline */}
        <section className="bg-white px-5 py-5">
          <h3 className="text-lg font-bold mb-4">진행 상황</h3>
          
          <div className="relative pl-10">
            {timeline.map((item, index) => (
              <div key={item.id} className="relative pb-6 last:pb-0">
                <div className={`absolute -left-10 top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.status === 'completed' 
                    ? 'bg-[#00984f] text-white' 
                    : item.status === 'active'
                    ? 'bg-white border-3 border-[#00984f] text-[#00984f]'
                    : 'bg-white border-3 border-gray-300 text-gray-400'
                }`}>
                  {item.status === 'completed' ? <Check size={16} /> : index + 1}
                </div>
                
                {index < timeline.length - 1 && (
                  <div className={`absolute -left-[26px] top-9 bottom-0 w-0.5 ${
                    item.status === 'completed' ? 'bg-[#00984f]' : 'bg-gray-300'
                  }`} />
                )}
                
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  {item.date && <p className="text-xs text-gray-500 mt-1">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NH Safety Banner */}
        <div className="mx-5 mt-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Shield size={24} className="text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold mb-1">NH농협 안심 연결</p>
            <p className="text-xs text-gray-700 leading-relaxed">
              개인정보는 보호되며, 모든 연결 과정을
              NH농협이 안전하게 지원합니다
            </p>
          </div>
        </div>
      </main>

      {/* Floating Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl transition-all ${
          isLiked ? 'bg-red-500' : 'bg-white'
        }`}
      >
        {isLiked ? '💚' : '❤️'}
      </button>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-5">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-[#00984f]" />
            </div>
            <h3 className="text-xl font-bold mb-2">안심번호로 연결</h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              실제 전화번호는 공개되지 않습니다.
              NH농협의 안심번호 서비스로
              안전하게 통화하실 수 있습니다.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
              >
                취소
              </button>
              <button 
                onClick={confirmCall}
                className="flex-1 py-3 bg-[#00984f] text-white rounded-xl font-semibold"
              >
                전화 연결
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-5">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-[#00984f]" />
            </div>
            <h3 className="text-xl font-bold mb-2">방문 신청 완료</h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              선택하신 날짜로 방문 요청을 보냈습니다.
              이준혁님의 확인 후 알림을 드리겠습니다.
            </p>
            <button 
              onClick={() => setShowVisitModal(false)}
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

export default Connection;