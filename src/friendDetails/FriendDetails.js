import './FriendDetails.css';
import Topmenu from '../topmenu/Topmenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect , useState} from 'react';
import PostItem from '../postItem/PostItem';

function FriendDetails() {
    const navigate = useNavigate();
    const myusername = localStorage.getItem('username');
    const location = useLocation();
    const { username, profilePic } = location.state;
    const [postList, setPostList] = useState([]);
    const [friends, setFriends] = useState([]);
    const token = localStorage.getItem(myusername);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:12345/api/users/${myusername}/friends/${username}/posts`, {
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

        fetchPosts();
    }, []);

    const handelUnfollow = async () => {
        try {
            await fetch(`http://localhost:12345/api/users/${myusername}/friends/${username}`, {
                 method: "DELETE",
                 headers: {
                    'Authorization': `Bearer ${token}`,
                }, 
                });
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
        navigate('/userDetails', { state: { username, profilePic } });
    };

    // useEffect(() =>{
    //     const fetchFriend = async () => {
    //         // Fetch friends
    //         try {
    //             const friendsResponse = await fetch(`http://localhost:12345/api/users/${username}/friends`, {
    //                  method: "GET",
    //                  headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //                 });
    //             if (!friendsResponse.ok) throw new Error('Failed to fetch friends');
    //             const friendsData = await friendsResponse.json();
    //             setFriends(friendsData); 
    
    //         } catch (error) {
    //             console.error('Error fetching friends:', error);
    //         }
    //     }; 
    //     fetchFriend();
    // }, []);


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
                        <button className="btn btn-primary" onClick={handelUnfollow}>unfollow</button>
                        {/* <div className="col-auto">
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#friendsModal">View Friends</button>
                        </div> */}
                    </div>
                    <div>
                        {postList.map((post) => <PostItem key={post.id} {...post} />)}  
                    </div>
                    {/* Friends List Modal */}
                    {/* <div className="modal fade" id="friendsModal" tabIndex="-1" role="dialog">
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
                                        {friends.map((friendsUsername, index) => (
                                            <li key={index}>{friendsUsername.username}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default FriendDetails