import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../logo/Logo';


function Login() {
    const navigate = useNavigate();
    // navigate(0);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = () => {
        navigate('/Signup');
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${username}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });
            if (response.ok) {
                const userDetails = await response.json();
                // Assuming the user object has a profilePic property
                localStorage.setItem('username', userDetails.username);
                localStorage.setItem('profilePic', userDetails.profilePic);
                localStorage.setItem('nickname', userDetails.nickname);
                localStorage.setItem('password', userDetails.password);
            } else {
                console.log('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleLoginClick = async (e) => {
        try {
            const response = await fetch('http://localhost:12345/api/tokens', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                },
                body: JSON.stringify({ username: username, password: password }),
            });
            if (response.ok){
                const token = await response.text();
                localStorage.setItem(username, token);
                //sessionStorage.setItem('isAuthenticated', 'true');
                await fetchUserDetails(token);
                navigate('/feedpage');
            } else {
                alert('Please signup first.');
                return;
            }
        }
        catch {
            alert('Login failed. Please try again');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <Logo />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email or phone number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleLoginClick}>
                    Log In
                </button>
                <div className="text-center mt-3">
                    <a href="#" onClick={handleSignUpClick}>Create New Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login