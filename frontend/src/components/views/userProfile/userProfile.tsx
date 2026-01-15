import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData, deleteData, type UserData } from '../../../services/api';
import { Button } from 'antd';


// User Profile Page Component
function userProfilePage() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    // Fetch user data on component mount
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetchData<UserData>('/');
                if (response) {
                    setName(response.name || '');
                    setEmail(response.email);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        getUserProfile();
    }, []);

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <a href="/">home</a>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                <p>User name: {name}</p>
                <p>User email: {email}</p>
                <Button type="primary" onClick={() => navigate('/update')}>
                    Update Profile
                </Button>
                <Button type="default" onClick={() => {deleteData('/'); alert('Account deleted successfully'); navigate('/')}}>
                    Delete Account
                </Button>
            </div>
        </div>
    )
}

export default userProfilePage;