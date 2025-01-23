import Comments from "./Comments";
import './Comments.css'
import { useState } from "react";
import { useRef } from 'react';

function ManageComments({ postid, comment, commentlen}) {
    let ref = useRef(commentlen);
     const comId = "newcom" + postid
    // const comments = commentList.find(post => post.id === postid)?.comments;

    let [Commentlist, setCommentList] = useState(comment)
    const  deletecom = (id) => {
        Commentlist  = Commentlist.filter(comment => comment.commentId !== id)
        setCommentList([...Commentlist]);

    };
    const editcom = (id, newComment) => {
        const index = Commentlist.findIndex(comment => comment.commentId === id);
        if (newComment !== "") {
            Commentlist[index].comment = newComment;
        }
        setCommentList([...Commentlist]);
    };

    const AddNewComment = () => {
        const commentContent = document.getElementById(comId).value;
       
            const com = {
                "commentId" : ref.current + 1,
                "name" : sessionStorage.getItem('nickname'),
                "comment" : commentContent,
                "usr_img" : sessionStorage.getItem('photo')
            };
            ref.current += 1;
            setCommentList([...Commentlist, com]);
            document.getElementById(comId).value = "";
    
    }

    const modelid = "example" + postid
    return (
        <div class="modal-dialog modal-dialog-scrollable"><br></br>
            <div class="modal fade" id={modelid} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Comments</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Map over the filtered comments and render them */}
                            {Commentlist && Commentlist.map((comment) => (
                                <Comments name={comment.name} comment={comment.comment} user_img={comment.usr_img} commentid={comment.commentId} deletecom={deletecom} editcom={editcom} />
                            ))}
                        </div>
                   
                    <div class="modal-footer">
                        <div className="mb-5">
                            <input type="username" className="newcomment" id={comId} placeholder="comment" />
                        </div>
                        <div className="mb-5">
                        <button type="button" class="btn btn-primary" onClick={AddNewComment}>Sent comment</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ManageComments