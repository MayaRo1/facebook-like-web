import './PostItem.css'
import Share from '../share/Share';
import ManageComments from '../comments/ManageComment';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



function PostItem({ id, profilePic, username, nickname, postText, img, comment, numOfLikes, commentlen, onDelete, onEdit, isDarkMode}) {
    const pid = id;
    console.log("id:", pid);
    const [content, setContent] = useState(postText);
    const [image, setImage] = useState(img);
    const [likes, setLikes] = useState(numOfLikes);
    const [friends, setFriends] = useState([]);
    const [imageTouched, setImageTouched] = useState(false);
    const myusername  = localStorage.getItem('username');
    const token = localStorage.getItem(myusername);
    let addLike = 1; 

    const navigate = useNavigate();


    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`http://localhost:12345/api/users/${myusername}/friends`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch friends');
                const data = await response.json();
                setFriends(data); 
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    const handleProfile = () => {
        if (friends) {
            const isFriend = friends.some(friend => friend.username === username);
            if (isFriend) {
                navigate('/friendDetails' , { state: { username, profilePic } });
            }
            else if (myusername === username){
                navigate('/profile');
            }
            else {
                navigate('/userDetails', { state: { username, profilePic } });
            }
        } else {
            navigate('/userDetails', { state: { username, profilePic } });
        }
    };


    const deletePost = async () => {
        if (username === myusername) {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${myusername}/posts/${pid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the post');
            }
            await response.json();
            onDelete(id);
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }else {
        alert('cant delete other user post');
    }
    };
    

    const editPost = async (postId) => {
        if (username === myusername) {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${myusername}/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postText: content,
                    img: image,
                })
            });

            if (!response.ok) {
                const result = await response.json();
                if (result.errors && result.errors.includes('Update denied by server due to URL content.')) {
                    alert('Update denied by server due to URL content.');
                } else {
                    // Display a more general error if it's not the specific URL denial
                    alert('Failed to edit the post. Status: ' + result.status);
                }
            }
    
            await response.json();
            console.log('Post edited successfully');
            onEdit(postId);
        } catch (error) {
            console.error('Error editing post:', error);
        }
    }else {
        alert('cant edit other user post');
    }
    };

    const handleImageChange = (e) => {
       // Set imageTouched to true when the file input changes
        setImageTouched(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = async () => {
        if (isLiked) {
            addLike = 0;
        } else {
            addLike = 1;
        }
        try {
            const response = await fetch(`http://localhost:12345/api/users/${myusername}/posts/${pid}/likes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    addLike: Number(addLike),
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to like the post');
            }
            const post = await response.json();
            console.log(post);
            setLikes(post.numOfLike);
        } catch (error) {
            console.error('Error liking post:', error);
        }
        setIsLiked(!isLiked);
        console.log(likes);
    };
    const likeClassName = isLiked ? 'nav-link active liked' : 'nav-link active';
    const modelTarget = "#example" + id


    return (
        <div className={`post-item ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="card mb-3">

        <div className="card-body">
                    <div className="profile-pic-and-title">
                        <img src={profilePic} className="profile-pic" alt="Profile" onClick={handleProfile}/>
                        <h5 className="card-title" onClick={handleProfile}>{nickname}</h5>
                    </div>
                <p className="card-text">{postText}</p>
                <img src={img} className="card-img-top" alt="..." />
                <ul className="nav nav-pills post-item-buttons">
                    <li className="nav-item">
                        <button className={likeClassName} onClick={handleLikeClick}>
                            <i className="bi bi-hand-thumbs-up"></i> {likes} Likes
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link active"  >
                            <i className="bi bi-chat"></i> Comment
                        </button>
                        {/* <ManageComments postid={id} comment={[comment]} commentlen={commentlen} /> */}
                    </li>
                    <li className="nav-item">
                        <button className="nav-link active" data-bs-toggle="modal" data-bs-target="#shareModal">
                            <i className="bi bi-send"></i> Share
                        </button>
                        <Share />
                    </li>
                </ul>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                <button className="debtn" onClick={deletePost}><i class="bi bi-trash3"></i></button>
                <button className="debtn" data-bs-toggle="modal" data-bs-target={`#editPost-${id}`}><i class="bi bi-pencil-square"></i></button>
                <div class="modal" tabindex="-1" id={`editPost-${id}`}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">edit post</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <input
                                        type="file"
                                        class="form-control"
                                        id="img"
                                        onChange={handleImageChange} 
                                        aria-label="add photo"
                                        placeholder='add profile picture'
                                    />

                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                                    <textarea class="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="3"></textarea>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={() => editPost(id)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default PostItem