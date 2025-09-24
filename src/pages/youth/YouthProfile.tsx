import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles,
  User,
  Target,
  Image,
  Camera
} from 'lucide-react';

interface ProfileData {
  introduction?: string;
  vision?: string;
  profileText?: string;
  photos?: { type: string; url?: string }[];
}

const YouthProfile: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    photos: [
      { type: 'face' },
      { type: 'portfolio' }
    ]
  });
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
        ${profileData.introduction || ''}
        ${profileData.vision || ''}
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

  const handleSkip = () => {
    if (currentStep === 3) {
      // 사진은 선택사항이므로 건너뛸 수 있음
      handleNext();
    }
  };

  const isCurrentStepValid = () => {
    switch(currentStep) {
      case 1:
        return (profileData.introduction?.length || 0) > 0;
      case 2:
        return (profileData.vision?.length || 0) > 0;
      case 3:
        return true; // 사진은 선택사항
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
            이제 설문을 통해<br />
            정확한 조건을 설정해보세요
          </p>
          
          <div className="bg-white rounded-2xl p-5 mb-8">
            <div className="text-sm text-gray-600 mb-2">작성된 프로필 텍스트</div>
            <div className="text-2xl font-bold text-[#00984f]">
              {(profileData.profileText?.split(' ').length || 0)}개 단어
            </div>
          </div>
          
          <button
            onClick={() => navigate('/youth/survey')}
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
          {currentStep === 3 ? (
            <button onClick={handleSkip} className="text-sm text-gray-500">
              건너뛰기
            </button>
          ) : (
            <div className="w-16" />
          )}
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
        {/* Step 1: 자기소개 */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">자기소개를 해주세요</h1>
              <p className="text-gray-600">
                농업 경험과 관심사를 자유롭게 작성해주세요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <p className="text-sm text-gray-600 mb-3">작성 예시</p>
              <p className="text-sm text-gray-700 italic">
                "농업 경력 2년차 청년농부입니다. 대학에서 농업경영학을 전공했고, 
                졸업 후 충남 부여의 토마토 농장에서 1년간 인턴으로 일했습니다. 
                유기농 재배에 관심이 많고, 전통 농법과 스마트팜 기술을 접목하고 싶습니다..."
              </p>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="농업 경력, 교육 이수, 관심 분야, 보유 기술 등을 자유롭게 소개해주세요"
                value={profileData.introduction || ''}
                onChange={(e) => setProfileData({...profileData, introduction: e.target.value})}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                <span>{(profileData.introduction?.length || 0)} / 500</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 농업 비전 */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">농업 비전을 들려주세요</h1>
              <p className="text-gray-600">
                어떤 농부가 되고 싶으신가요?
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-4">
              <p className="text-sm text-gray-600 mb-3">작성 도움말</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 농업을 선택한 이유와 목표</li>
                <li>• 배우고 싶은 농법이나 기술</li>
                <li>• 5년 후 나의 모습</li>
                <li>• 지역사회에 기여하고 싶은 점</li>
              </ul>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00984f] focus:outline-none resize-none h-48"
                placeholder="선배 농부님의 노하우를 배워 전통을 지키면서도 혁신적인 농업을 하고 싶습니다..."
                value={profileData.vision || ''}
                onChange={(e) => setProfileData({...profileData, vision: e.target.value})}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                <span>{(profileData.vision?.length || 0)} / 500</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 사진/포트폴리오 (선택) */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image size={32} className="text-[#00984f]" />
              </div>
              <h1 className="text-[28px] font-bold mb-2">프로필 사진 (선택)</h1>
              <p className="text-gray-600">
                신뢰감을 줄 수 있는 사진을 올려주세요
              </p>
            </div>

            <div className="space-y-4">
              {profileData.photos?.map((photo, index) => (
                <button
                  key={index}
                  className="w-full h-32 bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-[#00984f] transition-all"
                >
                  {photo.url ? (
                    <img src={photo.url} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <>
                      <Camera size={32} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        {photo.type === 'face' ? '프로필 사진' : '포트폴리오'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        탭하여 업로드
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mt-6">
              <p className="text-sm text-blue-900">
                💡 사진은 선택사항입니다. 나중에 프로필에서 추가할 수 있어요.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-50">
        <button
          onClick={handleNext}
          disabled={currentStep !== 3 && !isCurrentStepValid()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            (currentStep === 3 || isCurrentStepValid())
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

export default YouthProfile;