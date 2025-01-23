import Leftmenu from "../leftmenu/Leftmenu";
import Topmenu from "../topmenu/Topmenu";
import PostItem from "../postItem/PostItem";
import { useState, useEffect } from "react";
import './Feedpage.css'

function Feedpage() {
    const [postList, setPostList] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const myusername  = localStorage.getItem('username');
    const myprofilePic = localStorage.getItem('profilePic');
    const mynickname = localStorage.getItem('nickname');
    const token = localStorage.getItem(myusername);
    let comment = [];


    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:12345/api/posts`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            setPostList(posts, comment);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    function onEdit() {
        fetchPosts();

    }
    function onDelete(postId) {
        fetchPosts();
    }
    
    const AddNewPost = () => {
        const postContent = document.getElementById('postContent').value;
        const npImgInput = document.getElementById('npImg');
    
        // Ensure there's an image selected
        if (npImgInput.files.length > 0) {
            const npImg = npImgInput.files[0];
            const reader = new FileReader();
    
            reader.onload = async () => {
                try {
                    const imgData = reader.result; 
    
                    const post = await fetch(`http://localhost:12345/api/users/${myusername}/posts`, {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: myusername,
                            nickname: mynickname,
                            postText: postContent,
                            profilePic: myprofilePic,
                            img: imgData, // Use the base64 image data
                        })
                    });
                    

                    if (!post.ok) {
                        const result = await post.json();
                        // Check if there is a specific error message about URL denial from the server
                        if (result.errors && result.errors.includes('Post denied by server due to URL content.')) {
                            alert('Post denied by server due to URL content.');
                        } else {
                            // General error message for other issues
                            throw new Error('Failed to add new post. Status: ' + post.status);
                        }
                    } else {
                        const result = await post.json();
                        setPostList([result, ...postList]); // Assuming setPostList is a state setter function
                    }
                } 
                catch (error) {
                    console.error('Error in creating new post:', error);
                }
            };
    
            reader.readAsDataURL(npImg); // This starts the read operation
        } else {
            console.log("No image selected");
            // Handle case when no image is selected, or adjust your API payload accordingly
        }
    };
    

   


    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };


    return (
        <div className={`page ${isDarkMode ? 'darkMode' : ''}`}>
            <div className="container-fluid">
                <div>
                    <Topmenu  isDarkMode={isDarkMode}/>
                </div>
                <div className="row">
                    <div className="col-sm-3 vh-100 fixed-column"><Leftmenu isDarkMode={isDarkMode}/></div>
                    <div className="col-sm-9">
                        <button className="addBtn" data-bs-toggle="modal" data-bs-target="#newpost"><i class="bi bi-plus-lg"></i> Add Post</button>
                        <button className="modeBtn" onClick={toggleDarkMode}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
                        </div>
                        <div class="modal" tabindex="-1" id="newpost">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">create a new post</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <input type="file" class="form-control" id='npImg' aria-label="add photo" placeholder='add profile picture' required />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                                            <textarea class="form-control" id="postContent" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={AddNewPost}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                        {
                            postList && postList.length > 0 && postList.map((post) =>
                                <PostItem id = {post._id} {...post} onDelete={onDelete} onEdit={onEdit} isDarkMode={isDarkMode} />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
           
    
    );
}

export default Feedpage