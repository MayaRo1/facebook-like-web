import React, { useState, useEffect } from 'react';
import Topmenu from '../topmenu/Topmenu';
import PostItem from '../postItem/PostItem';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const myusername = localStorage.getItem('username');
    const myprofilepic = localStorage.getItem('profilePic');
    const mynickname = localStorage.getItem('nickname');
    const mypassword = localStorage.getItem('password');
    const token = localStorage.getItem(myusername);
    const [postList, setPostList] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pending, setPending] = useState([]);
    const [nickname, setNickname] = useState(mynickname);
    const [password, setPassword] = useState(mypassword);
    const [profilePic, setProfilePic] = useState(myprofilepic);
    const navigate = useNavigate();

    function onEdit() {
        fetchPosts();

    }
    function onDelete(postId) {
        fetchPosts();
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${myusername}/posts`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            setPostList(posts);
            console.log(posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {

        fetchPosts();
    }, []);


    const fetchFriendsAndPending = async () => {
        // Fetch friends
        try {
            const friendsResponse = await fetch(`http://localhost:12345/api/users/${myusername}/friends`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!friendsResponse.ok) throw new Error('Failed to fetch friends');
            const friendsData = await friendsResponse.json();
            setFriends(friendsData); // Added || [] to ensure it's always an array

            // Fetch pending friends
            const pendingResponse = await fetch(`http://localhost:12345/api/users/${myusername}/pendingFriends`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!pendingResponse.ok) throw new Error('Failed to fetch pending friends');
            const pendingData = await pendingResponse.json();
            console.log(pendingData);
            //pending = pendingData;
            setPending(pendingData); // Added || [] to ensure it's always an array
            console.log("new", pending);

        } catch (error) {
            console.error('Error fetching friends or pending friends:', error);
        }
    };


    // Initial fetch for friends and pending friends
    useEffect(() => {
        fetchFriendsAndPending();
    }, []);

    const acceptFriendRequest = async (friendUsername) => {
        try {
            await fetch(`http://localhost:12345/api/users/${myusername}/friends/${friendUsername}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Refresh friends and pending lists after accepting a friend request
            fetchFriendsAndPending();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };
    const deleteFriendRequest = async (friendUsername) => {
        try {
            await fetch(`http://localhost:12345/api/users/${myusername}/friends/${friendUsername}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Refresh friends and pending lists after accepting a friend request
            fetchFriendsAndPending();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${myusername}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json();
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleEdit = async () => {
        try {
            console.log("password" ,password);
            console.log("nickname" ,nickname);
            const response = await fetch(`http://localhost:12345/api/users/${myusername}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    password: password,
                    nickname: nickname,
                    profilePic: profilePic,
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json();
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('password', password);
            localStorage.setItem('profilePic', profilePic);
            fetchPosts();
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div><Topmenu />
            <div className="container">
                <div className="row align-items-center profile-header">
                    <div className="col-auto">
                        <img src={myprofilepic} className="profile-image-placeholder" alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'grey' }} />
                    </div>
                    <div className="col d-flex justify-content-between align-items-center">
                        <h2>{nickname}</h2>
                        <div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#friendsModal">View Friends</button>
                            <button className="btn btn-primary ml-2" data-bs-toggle="modal" data-bs-target="#pendingModal">View Pending Requests</button>
                            <button className="btn btn-primary ml-2" onClick={handleDelete}>Delete Account</button>
                            <button className="btn btn-primary ml-2" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile Details</button>
                        </div>
                    </div>
                </div>
                <div>
                    {postList.map((post) => <PostItem id={post._id} {...post} onDelete={onDelete} onEdit={onEdit} />)}
                </div>
            </div>

            {/* Friends List Modal */}
            <div className="modal fade" id="friendsModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">My Friends</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <ul>
                    {friends.map((friend, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px' }}>
                            <div className="d-flex align-items-center">
                                <img 
                                    src={friend.profilePic} 
                                    alt={`${friend.username}'s profile`} 
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                {friend.username}
                            </div>
                            <div>
                                <button className="btn btn-success" onClick={() => deleteFriendRequest(friend.username)}>Unfollow</button>
                            </div>
                        </li>
                    ))}
                </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Requests Modal */}
            <div className="modal fade" id="pendingModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Pending Friend Requests</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <ul>
                    {pending.map((pendingUser, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center" style={{ marginBottom: '10px' }}>
                            <div className="d-flex align-items-center">
                                <img 
                                    src={pendingUser.profilePic} 
                                    alt={`${pendingUser.username}'s profile`} 
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                {pendingUser.username}
                            </div>
                            <div>
                                <button className="btn btn-success ml-2" onClick={() => acceptFriendRequest(pendingUser.username)}>Accept</button>
                                <button className="btn btn-danger ml-2" onClick={() => deleteFriendRequest(pendingUser.username)}>Decline</button>
                            </div>
                        </li>
                    ))}
                </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProfileModalLabel">Edit Profile Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nickname" className="form-label">Nickname</label>
                                    <input type="text" className="form-control" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Photo</label>
                                    <input type="file" className="form-control" id="photo" onChange={handlePhotoChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
