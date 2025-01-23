import './UserDetails.css';
import Topmenu from '../topmenu/Topmenu';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function UserDetails() {
    const location = useLocation();
    const { username, profilePic } = location.state;

    const [isFollowing, setIsFollowing] = useState(false);
    const myusername = localStorage.getItem('username');
    const token = localStorage.getItem(myusername);

    const handleFollowClick = async () => {
        if (isFollowing) {
            // User is currently following, so proceed with unfollow (delete friend)
            try {
                const response = await fetch(`http://localhost:12345/api/users/${username}/friends/${myusername}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Delete friend response:', data);
                setIsFollowing(false); // Update follow state on successful unfollow
            } catch (error) {
                console.error('Error deleting friend:', error);
            }
        } else {
            // User is not currently following, proceed with follow logic
            try {
                const response = await fetch(`http://localhost:12345/api/users/${myusername}/friends`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username }) // Adjust based on your API's requirements
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Add friend response:', data);
                setIsFollowing(true); // Update follow state on successful follow
            } catch (error) {
                console.error('Error adding friend:', error);
            }
        }
    };
    return (
        <div><Topmenu />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img src={profilePic} className="profile-image-placeholder" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'grey' }} />
                    </div>
                    <div className="col">
                        <h2>{username}</h2>
                    </div>
                    <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleFollowClick}>
                            {isFollowing ? 'Cancel Follow Request' : 'Follow'}
                        </button>
                    </div>
                    <div className='blocked'>
                        <i class="bi bi-lock"></i>
                        <h2>This account is private</h2>
                        <p>Follow this account to see their photos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails