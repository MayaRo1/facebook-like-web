import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo/Logo';

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickName, setnickName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo'){
            const reader = new FileReader();
            reader.onload=() => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
        else{
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'verifyPassword':
                setConfirmPassword(value);
                break;
            case 'nickname':
                setnickName(value);
                break;
            // case 'photo':
            //     setProfilePicture(files[0]);
            default:
                break;
        }
    }
    };

    const saveDataToLocalStorage = () => {
       localStorage.setItem('username', username);
       localStorage.setItem('profilePic', profilePicture);
        
    };

    const handleSignUpClick = async (event) => {
        if (username === '' || password === '' || confirmPassword === '' || nickName === '' || !profilePicture) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (password.length < 8 || password.length > 20) {
            alert('Password must be 8-20 characters long.');
            return;
        }


        try {
            const response = await fetch('http://localhost:12345/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'text/plain'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    nickname: nickName,
                    profilePic: profilePicture,
                })
            });
            

            if (!response.ok) {
                throw new Error('Failed to sign up. Status: ' + response.status);
            }

            const result = await response.json();
            console.log(result);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePicture);
            alert('Sign up successful');
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };


    return (
        <div className="container d-flex align-items-center vh-100">
            <div className="row">
                <div className="col-md">
                    <div className="mb-3">
                        <input type="text" className="form-control" name="username" value={username} onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        <div className="form-text">Your password must be 8-20 characters long</div>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="verifyPassword" value={confirmPassword} onChange={handleChange} placeholder="Verify Password" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="nickname" value={nickName} onChange={handleChange} placeholder="Nickname" />
                    </div>
                    <div className="mb-3">
                        <input type="file" className="form-control" name="photo" onChange={handleChange} aria-label="Add photo" />
                    </div>
                    <div className="d-grid gap-2 col-9">
                        <button type="button" className="btn btn-primary" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
                <div className="col-md">
                    <Logo />
                </div>
            </div>
        </div>
    );
}

export default Signup;
