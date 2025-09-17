import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MobileHome from './pages/MobileHome';
import ValueAssessment from './pages/senior/ValueAssessment';
import Survey from './pages/senior/Survey';
import Dashboard from './pages/senior/Dashboard';
import RecommendationList from './pages/matching/RecommendationList';
import CandidateDetail from './pages/matching/CandidateDetail';
import Connection from './pages/matching/Connection';
import Finance from './pages/finance/Finance';
import YouthSurvey from './pages/youth/YouthSurvey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MobileHome />} />
          <Route path="senior">
            <Route path="value-check" element={<ValueAssessment />} />
            <Route path="survey" element={<Survey />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="youth">
            <Route path="profile" element={<div className="pt-20 p-8">청년 프로필 페이지</div>} />
            <Route path="survey" element={<YouthSurvey />} />
            <Route path="dashboard" element={<div className="pt-20 p-8">청년 대시보드</div>} />
          </Route>
          <Route path="matching">
            <Route path="list" element={<RecommendationList />} />
            <Route path="profile/:id" element={<CandidateDetail />} />
            <Route path="connect/:id" element={<Connection />} />
          </Route>
          <Route path="community" element={<div className="pt-20 p-8">커뮤니티</div>} />
          <Route path="partnership" element={<div className="pt-20 p-8">파트너십 관리</div>} />
          <Route path="finance" element={<Finance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;