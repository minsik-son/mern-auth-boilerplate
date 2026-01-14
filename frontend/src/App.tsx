import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Button } from 'antd'
import LoginPage from './components/views/login/login'
import SignupPage from './components/views/signup/signup'
import UserProfilePage from './components/views/userProfile/userProfile'
import UserUpdatePage from './components/views/userUpdate/userUpdate'

// 메인 화면 컴포넌트 (편의상 분리)
function Home() {
  const navigate = useNavigate(); // 이동을 위한 함수

  return (
    <div className="App">
      <h1>Fullstack App</h1>
      <Button type="primary" onClick={() => navigate('/login')}>
        Login 페이지로 이동
      </Button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup Route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* User Profile Route */}
        <Route path="/profile" element={<UserProfilePage />} />

        {/* User Update Route */}
        <Route path="/update" element={<UserUpdatePage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;