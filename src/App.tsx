import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MobileHome from './pages/MobileHome';
import ValueAssessment from './pages/senior/ValueAssessment';
import Survey from './pages/senior/Survey';
import Dashboard from './pages/senior/Dashboard';
import SeniorProfile from './pages/senior/SeniorProfile';
import RecommendationList from './pages/matching/RecommendationList';
import CandidateDetail from './pages/matching/CandidateDetail';
import Connection from './pages/matching/Connection';
import Finance from './pages/finance/Finance';
import YouthSurvey from './pages/youth/YouthSurvey';
import YouthProfile from './pages/youth/YouthProfile';
import YouthDashboard from './pages/youth/YouthDashboard';
import CommunityList from './pages/community/CommunityList';
import ChatPage from './pages/community/ChatPage';
import Partnership from './pages/partnership/Partnership';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MobileHome />} />
          <Route path="senior">
            <Route path="profile" element={<SeniorProfile />} />
            <Route path="value-check" element={<ValueAssessment />} />
            <Route path="survey" element={<Survey />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="youth">
            <Route path="profile" element={<YouthProfile />} />
            <Route path="survey" element={<YouthSurvey />} />
            <Route path="dashboard" element={<YouthDashboard />} />
          </Route>
          <Route path="matching">
            <Route path="list" element={<RecommendationList />} />
            <Route path="profile/:id" element={<CandidateDetail />} />
            <Route path="connect/:id" element={<Connection />} />
          </Route>
          <Route path="community">
            <Route index element={<CommunityList />} />
            <Route path="chat/:id" element={<ChatPage />} />
          </Route>
          <Route path="partnership" element={<Partnership />} />
          <Route path="finance" element={<Finance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;