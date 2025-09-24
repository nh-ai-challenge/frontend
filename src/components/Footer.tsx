import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">NH농협 Land Bridge</div>
            <p className="text-gray-400 text-sm">
              농협중앙회가 운영하는 농장 승계 매칭 플랫폼<br />
              시니어와 청년이 함께 만드는 농업의 미래
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/senior/register" className="text-gray-400 hover:text-white text-sm">
                  농장 등록
                </Link>
              </li>
              <li>
                <Link to="/youth/register" className="text-gray-400 hover:text-white text-sm">
                  청년 등록
                </Link>
              </li>
              <li>
                <Link to="/matching" className="text-gray-400 hover:text-white text-sm">
                  AI 매칭
                </Link>
              </li>
              <li>
                <Link to="/finance" className="text-gray-400 hover:text-white text-sm">
                  금융 상품
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/guide" className="text-gray-400 hover:text-white text-sm">
                  이용 가이드
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  1:1 문의
                </Link>
              </li>
              <li>
                <Link to="/notice" className="text-gray-400 hover:text-white text-sm">
                  공지사항
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">정보</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  이용약관
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-gray-400 hover:text-white text-sm">
                  사업자정보
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="text-gray-400 hover:text-white text-sm">
                  제휴문의
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2025 농협중앙회. All rights reserved. | 대표전화: 1588-2100
        </div>
      </div>
    </footer>
  );
};

export default Footer;