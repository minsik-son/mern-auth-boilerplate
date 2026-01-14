import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchData, postData, type UserData } from '../../../services/api';

// Login Page Component
function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    
    // Form submit handler
    const handleSubmit = async() => {
        const body: UserData = {
            email,
            password
        };
        try { 
            const response = await postData('/login', body);
            if (response) {
                alert('Login successful');
                console.log("Login successful:", response);
                navigate('/profile')
            }
            else {
                console.error("Login failed");
                alert('Login failed');
            }
        }
        catch (error) {
            alert('Error during login');
            console.error("Login error:", error);
        }
    }

    const loginCheck = async() => {
        try {
            const users = await fetchData('/users');
            if(users) {
                console.log("Fetched users:", users);
                alert('Fetched users, check console');
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Email">
                        <Input placeholder="example@email.com" value={email} onChange={emailHandler} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password value={password} onChange={passwordHandler} />
                    </Form.Item>
                    <Form.Item label="signup">
                    </Form.Item>
                    <Button type="primary" block className="mt-4 h-10" htmlType="submit">
                        Login
                    </Button>
                    <Button type="primary" block className="mt-4 h-10" onClick={() => navigate('/signup')}>
                        Sign Up
                    </Button>

                </Form>
            </div>
        </div>
    );
}

export default LoginPage