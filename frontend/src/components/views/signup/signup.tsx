import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import { postData, type UserData } from '../../../services/api';

// Signup Page Component
function signupPage() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    // Form submit handler
    const handleSubmit = async() => {
        const body : UserData = {
            name,
            email,
            password
        };
        try { 
            const response = await postData('/register', body);
            if (response) {
                alert('Submitted');
                console.log("Signup successful:", response);
            }
            else {
                console.error("Signup failed");
                alert('Signup failed');
            }
        }
        catch (error) {
            alert('Error during signup');
            console.error("Signup error:", error);

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Name">
                        <Input 
                            placeholder="name"
                            value={name}
                            onChange={nameHandler}
                        />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input 
                            placeholder="example@email.com"
                            value={email}
                            onChange={emailHandler}
                        />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password
                            placeholder="password"
                            value={password}
                            onChange={passwordHandler}
                        />
                    </Form.Item>
                    <Button type="primary" block className="mt-4 h-10" htmlType="submit"> 
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default signupPage;