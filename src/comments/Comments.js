import './Comments.css'
import { useState } from 'react';

function Comments({name, comment, user_img, commentid, deletecom, editcom}) {
    const [isEditing, setIsEditing] = useState(false);

    const [commentContent, setCommentContent] = useState(comment);
    const deleteComment = () => {
        deletecom(commentid);
    };
    const openEditComment = () => {
        setIsEditing(true);
    };
  

    const editComment = () => {
        const newComment = document.getElementById('commentBox').value;
        editcom(commentid, newComment);
        //Update the local state with the new comment
        setIsEditing(false);
    };
    return (
        <div>
            <div className="all_comment">
                <div class="toast-header">
                    <img src={user_img} class="rounded me-2" alt="..." />
                    <strong class="me-auto">{name}</strong>
                    <small>11 mins ago</small>
                </div>
                <div className="toast-body">
                    {isEditing ? (
                        <textarea
                            id="commentBox"
                            //  Populate with the current comment content
                            defaultValue= {comment}
                            placeholder="Enter your updated comment here..."
                        ></textarea>
                    ) : (
                        comment
                    )}
                </div><br></br>
                {/* delete comment */}
                <button className="dcbtn" onClick={deleteComment}><i class="bi bi-trash3"></i></button>
                {isEditing ? (
                    <button className="ecbtn" onClick={editComment}>
                        Update
                    </button>
                ) : (
                    <button className="ecbtn" onClick={openEditComment}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                )}
            </div><br></br>
        </div>
    );
}

export default Comments
