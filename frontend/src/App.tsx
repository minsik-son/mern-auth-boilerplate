import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Button } from 'antd'
import LoginPage from './components/views/login/login'
import SignupPage from './components/views/signup/signup'
import UserProfilePage from './components/views/userProfile/userProfile'
import UserUpdatePage from './components/views/userUpdate/userUpdate'
import { fetchData, type UserData } from './services/api';


// 메인 화면 컴포넌트 (편의상 분리)
function Home() {
  const navigate = useNavigate(); // 이동을 위한 함수

  const handleLoginClick = async () => {
    try {
      // Try to fetch user data from a protected endpoint
      await fetchData<UserData>('/');
      // If the request succeeds, the user has a valid token
      navigate('/profile');
    } catch (error) {
      // If the request fails (e.g., 401 Unauthorized), the user is not logged in
      console.error("Authentication check failed:", error);
      navigate('/login');
    }
  };

  return (
    <div className="mx-auto text-center p-4">
      <h1>Login Auth Bolierplate</h1>
      <Button className='mt-4' type="primary" onClick={handleLoginClick}>
        Log in
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