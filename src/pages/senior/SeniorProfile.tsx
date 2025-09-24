import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  Sparkles,
  User,
  Heart,
  MessageCircle
} from 'lucide-react';

interface ProfileData {
  farmIntro?: string;
  philosophy?: string;
  message?: string;
  profileText?: string;
}

const SeniorProfile: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSteps = 3;
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // 전체 텍스트 결합 (임베딩용)
      const combinedText = `
        ${profileData.farmIntro || ''}
        ${profileData.philosophy || ''}
        ${profileData.message || ''}
      `.trim();
      
      setProfileData({
        ...profileData,
        profileText: combinedText
      });
      
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

  const isCurrentStepValid = () => {
    switch(currentStep) {
      case 1:
        return (profileData.farmIntro?.length || 0) > 0;
      case 2:
        return (profileData.philosophy?.length || 0) > 0;
      case 3:
        return (profileData.message?.length || 0) > 0;
      default:
        return false;
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-[#00984f] to-[#00c968] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={60} className="text-white" />
          </div>
          <h1 className="text-[32px] font-bold mb-3">프로필 작성 완료!</h1>
          <p className="text-lg text-gray-600 mb-8">
            이제 매칭 설문을 통해<br />
            정확한 조건을 설정해보세요
          </p>
          
          <div className="bg-white rounded-2xl p-5 mb-8">
            <div className="text-sm text-gray-600 mb-2">작성된 프로필 텍스트</div>
            <div className="text-2xl font-bold text-[#00984f]">
              {(profileData.profileText?.split(' ').length || 0)}개 단어
            </div>
          </div>
          
          <button
            onClick={() => navigate('/senior/survey')}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#00984f] to-[#00c968] text-white rounded-2xl font-bold text-lg"
          >
            매칭 설문 시작하기
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
          <span className="text-sm font-medium">프로필 작성 {currentStep} / {totalSteps}</span>
          <div className="w-8" />
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
        {/* Step 1: 농장 소개 */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">농장을 소개해주세요</h1>
              <p className="text-gray-600">
                농장의 역사와 현재 상황을 자유롭게 작성해주세요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <p className="text-sm text-gray-600 mb-3">작성 예시</p>
              <p className="text-sm text-gray-700 italic">
                "저는 충남 논산에서 15년째 딸기 농장을 운영하고 있습니다. 
                처음에는 500평으로 시작했지만 현재는 1,500평 규모로 성장했습니다. 
                유기농 인증을 받았고, 연간 매출은 약 1억 5천만원 정도입니다..."
              </p>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="농장의 위치, 규모, 재배 작물, 운영 기간 등을 자유롭게 소개해주세요"
                value={profileData.farmIntro || ''}
                onChange={(e) => setProfileData({...profileData, farmIntro: e.target.value})}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                <span>{(profileData.farmIntro?.length || 0)} / 500</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 농업 철학 */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">농업 철학을 들려주세요</h1>
              <p className="text-gray-600">
                어떤 마음으로 농사를 지어오셨나요?
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <p className="text-sm text-gray-600 mb-3">작성 도움말</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 농업을 시작한 계기와 목표</li>
                <li>• 지켜온 원칙과 가치관</li>
                <li>• 자랑스러운 성과나 경험</li>
                <li>• 농업에 대한 신념</li>
              </ul>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="전통을 지키면서도 품질 향상을 위해 노력했습니다. 토양 관리부터..."
                value={profileData.philosophy || ''}
                onChange={(e) => setProfileData({...profileData, philosophy: e.target.value})}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                <span>{(profileData.philosophy?.length || 0)} / 500</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 후계자에게 전하는 메시지 */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">후계자에게 한마디</h1>
              <p className="text-gray-600">
                어떤 후계자를 찾고 계신가요?
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <p className="text-sm text-gray-600 mb-3">이런 내용을 담아보세요</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 원하는 후계자의 마음가짐</li>
                <li>• 전수하고 싶은 노하우</li>
                <li>• 함께 이루고 싶은 목표</li>
                <li>• 승계 후 비전</li>
              </ul>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="성실하고 배우려는 자세를 가진 청년을 찾습니다. 제가 쌓아온 노하우를..."
                value={profileData.message || ''}
                onChange={(e) => setProfileData({...profileData, message: e.target.value})}
                maxLength={300}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                <span>{(profileData.message?.length || 0)} / 300</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-50">
        <button
          onClick={handleNext}
          disabled={!isCurrentStepValid()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            isCurrentStepValid()
              ? 'bg-gradient-to-r from-[#00984f] to-[#00c968] text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {currentStep === totalSteps ? '완료' : '다음으로'}
        </button>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default SeniorProfile;