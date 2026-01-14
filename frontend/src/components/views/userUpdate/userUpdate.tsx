import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, updateData, type UserData } from '../../../services/api';
import { Button } from 'antd';

// User Update Page Component
function UserUpdatePage() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }   

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

    // Update handler
    const updateHandler = async() => {
        const body: UserData = {
            name,
            email
        };
        try { 
            const response = await updateData('/', body);
            if (response) {
                alert('Updated');
                console.log("Update successful:", response);
            }
            else {
                console.error("Update failed");
                alert('Update failed');
            }
        }
        catch (error) {
            alert('Error during update');
            console.error("Update error:", error);
        }
    }   

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <a href="/">home</a>
            <a href="/profile">back</a>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                <p>User name: {name}</p>
                <input type="text" value={name} onChange={nameHandler} />
                <p>User email: {email}</p>
                <input type="text" value={email} onChange={emailHandler} />
            </div>
            <Button type="primary" htmlType='submit' onClick={updateHandler}>
                Update
            </Button>
            <Button type="default" htmlType='button' onClick={() => window.location.href = '/profile'}>
                Cancel
            </Button>
        </div>
    )
}

export default UserUpdatePage;