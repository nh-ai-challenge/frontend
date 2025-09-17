import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MobileHome from './pages/MobileHome';
import ValueAssessment from './pages/senior/ValueAssessment';
import Survey from './pages/senior/Survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MobileHome />} />
          <Route path="senior">
            <Route path="value-check" element={<ValueAssessment />} />
            <Route path="survey" element={<Survey />} />
            <Route path="dashboard" element={<div className="pt-20 p-8">시니어 대시보드</div>} />
          </Route>
          <Route path="youth">
            <Route path="profile" element={<div className="pt-20 p-8">청년 프로필 페이지</div>} />
            <Route path="survey" element={<div className="pt-20 p-8">청년 설문 페이지</div>} />
            <Route path="dashboard" element={<div className="pt-20 p-8">청년 대시보드</div>} />
          </Route>
          <Route path="matching">
            <Route path="list" element={<div className="pt-20 p-8">추천 리스트</div>} />
            <Route path="profile/:id" element={<div className="pt-20 p-8">상세 프로필</div>} />
          </Route>
          <Route path="community" element={<div className="pt-20 p-8">커뮤니티</div>} />
          <Route path="partnership" element={<div className="pt-20 p-8">파트너십 관리</div>} />
          <Route path="finance" element={<div className="pt-20 p-8">금융상품</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;