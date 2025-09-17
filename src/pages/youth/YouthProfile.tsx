import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera,
  Plus,
  X,
  ChevronRight,
  Target,
  Sparkles,
  Settings,
  Image,
  Check
} from 'lucide-react';

interface ProfileData {
  goal?: string;
  skills: string[];
  experience?: string;
  vision?: string;
  period?: number;
  budget?: number;
  mentoring?: boolean;
  gradual?: boolean;
  photos: { type: string; url?: string }[];
  greeting?: string;
}

const YouthProfile: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    skills: ['사과 재배', 'GAP 인증'],
    photos: [
      { type: 'face' },
      { type: 'work' },
      { type: 'cert' }
    ],
    period: 1,
    budget: 5000,
    mentoring: false,
    gradual: false
  });
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSteps = 5;
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setShowCompletion(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const addSkill = (skill: string) => {
    if (!profileData.skills.includes(skill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill]
      });
    }
  };

  const removeSkill = (index: number) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((_, i) => i !== index)
    });
  };

  const formatBudget = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}억원`;
    }
    return `${value.toLocaleString()}만원`;
  };

  const periodLabels = ['즉시', '1년 이내', '2년 이내', '3년 이내', '5년 이내'];

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={60} className="text-white" />
          </div>
          <h1 className="text-[32px] font-bold mb-3">비전 프로필 완성!</h1>
          <p className="text-lg text-gray-600 mb-8">
            AI가 작성하신 내용을 분석해<br />
            최적의 시니어 농부님을 찾아드릴게요
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5">
              <div className="text-3xl font-bold text-[#00984f] mb-1">87%</div>
              <div className="text-sm text-gray-600">프로필 완성도</div>
            </div>
            <div className="bg-white rounded-2xl p-5">
              <div className="text-3xl font-bold text-[#00984f] mb-1">12명</div>
              <div className="text-sm text-gray-600">매칭 가능 농장</div>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/youth/dashboard')}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl font-bold text-lg"
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
          <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-medium">{currentStep} / {totalSteps}</span>
          <button onClick={handleSkip} className="text-sm text-gray-500">
            건너뛰기
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
        {/* Step 1: 목표 선택 */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h1 className="text-[28px] font-bold mb-2">어떤 목표를 가지고 계신가요?</h1>
              <p className="text-gray-600">농장 승계를 통해 이루고 싶은 목표를 선택해주세요</p>
            </div>

            <div className="space-y-3">
              {[
                { value: 'tradition', icon: '🌱', title: '전통 계승', desc: '선배님의 노하우를 이어받아 전통을 지키고 싶어요' },
                { value: 'innovation', icon: '🚀', title: '혁신 도입', desc: '스마트팜 등 새로운 기술을 접목하고 싶어요' },
                { value: 'scale', icon: '📈', title: '규모 확대', desc: '농장을 더 크게 키워 사업화하고 싶어요' },
                { value: 'community', icon: '🤝', title: '지역 상생', desc: '지역사회와 함께 성장하는 농장을 만들고 싶어요' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfileData({...profileData, goal: option.value})}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                    profileData.goal === option.value
                      ? 'bg-green-50 border-[#00984f]'
                      : 'bg-white border-gray-200 hover:border-[#00984f]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{option.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      profileData.goal === option.value
                        ? 'bg-[#00984f] border-[#00984f]'
                        : 'border-gray-300'
                    }`}>
                      {profileData.goal === option.value && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 경험 입력 */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📝</div>
              <h1 className="text-[28px] font-bold mb-2">농업 경험을 알려주세요</h1>
              <p className="text-gray-600">어떤 경험과 기술을 가지고 계신지 자유롭게 작성해주세요</p>
            </div>

            <div className="mb-6">
              <label className="block text-base font-semibold mb-3">주요 경력</label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-32"
                placeholder="예) 충주 사과농장에서 5년간 재배 기술을 익혔습니다. GAP 인증 취득 경험이 있으며..."
                value={profileData.experience || ''}
                onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                maxLength={200}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {(profileData.experience?.length || 0)} / 200
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold mb-3">보유 기술</label>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 min-h-[120px]">
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00984f] text-white rounded-full text-sm">
                      {skill}
                      <button onClick={() => removeSkill(index)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full outline-none text-sm"
                  placeholder="기술을 입력하고 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addSkill(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">추천 기술</p>
                <div className="flex flex-wrap gap-2">
                  {['유기농', '스마트팜', '직거래', '가공품', '체험농장'].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 비전 작성 */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">✨</div>
              <h1 className="text-[28px] font-bold mb-2">나만의 농업 비전</h1>
              <p className="text-gray-600">앞으로 어떤 농장을 만들고 싶으신가요?</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold mb-3">💡 작성 도움말</p>
              <div className="space-y-2">
                {[
                  '📌 3년 후 달성하고 싶은 목표',
                  '📌 농장의 차별화 포인트',
                  '📌 지역사회 기여 방안'
                ].map((tip, index) => (
                  <button
                    key={index}
                    className="block text-left text-sm text-gray-700 hover:text-[#00984f]"
                    onClick={() => {
                      const templates = [
                        '3년 후 저는 연 매출 2억원의 안정적인 농장을 운영하고 있을 것입니다. ',
                        '저희 농장만의 특별한 재배 기술로 최고 품질의 농산물을 생산하겠습니다. ',
                        '지역 청년들에게 일자리를 제공하고 농업 교육 프로그램을 운영하겠습니다. '
                      ];
                      setProfileData({
                        ...profileData,
                        vision: (profileData.vision || '') + templates[index]
                      });
                    }}
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="저는 전통과 혁신이 조화를 이루는 농장을 만들고 싶습니다..."
                value={profileData.vision || ''}
                onChange={(e) => setProfileData({...profileData, vision: e.target.value})}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {(profileData.vision?.length || 0)} / 500
              </div>
              <p className="text-xs text-gray-500 mt-2">
                시니어 농부님께 보여질 중요한 내용입니다. 진심을 담아 작성해주세요.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: 조건 설정 */}
        {currentStep === 4 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">⚙️</div>
              <h1 className="text-[28px] font-bold mb-2">희망 조건을 설정해주세요</h1>
              <p className="text-gray-600">농장 승계 시 원하는 조건을 알려주세요</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">희망 승계 시기</span>
                  <span className="text-lg font-bold text-[#00984f]">
                    {periodLabels[profileData.period - 1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={profileData.period}
                  onChange={(e) => setProfileData({...profileData, period: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>즉시</span>
                  <span>5년 이후</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">초기 투자 가능 금액</span>
                  <span className="text-lg font-bold text-[#00984f]">
                    {formatBudget(profileData.budget)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="1000"
                  value={profileData.budget}
                  onChange={(e) => setProfileData({...profileData, budget: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1천만원</span>
                  <span>3억원</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setProfileData({...profileData, mentoring: !profileData.mentoring})}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    profileData.mentoring
                      ? 'bg-green-50 border-[#00984f]'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">멘토링 희망</h3>
                      <p className="text-sm text-gray-600">선배님께 지속적으로 배우고 싶어요</p>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      profileData.mentoring
                        ? 'bg-[#00984f] border-[#00984f]'
                        : 'border-gray-300'
                    }`}>
                      {profileData.mentoring && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setProfileData({...profileData, gradual: !profileData.gradual})}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    profileData.gradual
                      ? 'bg-green-50 border-[#00984f]'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">단계적 승계</h3>
                      <p className="text-sm text-gray-600">천천히 단계별로 인수하고 싶어요</p>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      profileData.gradual
                        ? 'bg-[#00984f] border-[#00984f]'
                        : 'border-gray-300'
                    }`}>
                      {profileData.gradual && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: 사진 업로드 */}
        {currentStep === 5 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📸</div>
              <h1 className="text-[28px] font-bold mb-2">나를 표현하는 사진</h1>
              <p className="text-gray-600">프로필 사진과 포트폴리오를 업로드해주세요</p>
            </div>

            <div className="mb-6">
              <label className="block text-base font-semibold mb-3">프로필 사진</label>
              <div className="grid grid-cols-3 gap-3">
                {profileData.photos.map((photo, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-[#00984f] transition-all"
                  >
                    {photo.url ? (
                      <img src={photo.url} alt="" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <span className="text-3xl mb-2">
                          {photo.type === 'face' && '👤'}
                          {photo.type === 'work' && '🌾'}
                          {photo.type === 'cert' && '🏆'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {photo.type === 'face' && '얼굴 사진'}
                          {photo.type === 'work' && '작업 사진'}
                          {photo.type === 'cert' && '수상/인증'}
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">신뢰감을 줄 수 있는 사진을 선택해주세요</p>
            </div>

            <div>
              <label className="block text-base font-semibold mb-3">한 마디</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none"
                placeholder="시니어 농부님께 전하고 싶은 말"
                value={profileData.greeting || ''}
                onChange={(e) => setProfileData({...profileData, greeting: e.target.value})}
                maxLength={50}
              />
              <p className="text-sm text-gray-500 mt-2">프로필에 표시될 짧은 인사말입니다</p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-50">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl font-bold text-lg"
        >
          {currentStep === totalSteps ? '완료' : '다음으로'}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #00984f;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #00984f;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default YouthProfile;