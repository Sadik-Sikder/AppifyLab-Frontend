import React, { useState } from "react";

const CommentList = ({
  postId,
  comments = [],
  currentUser,
  onAddComment,
  onLoadComments,
  hasMoreComments,
  repliesByCommentId,
  onLoadReplies,
  onAddReply,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(postId, commentText);
    setCommentText("");
  };

  return (
    <div className="_post_comments">
      {comments.map((comment) => (
        <div key={comment.id} className="_comment">
          <img src={comment.user.avatar} alt={comment.user.name} />
          <div>
            <strong>{comment.user.name}</strong>
            <p>{comment.text}</p>

            <div className="_comment_replies">
              {(repliesByCommentId[comment.id] || []).map((reply) => (
                <div key={reply.id} className="_comment_reply">
                  <img src={reply.user.avatar} alt={reply.user.name} />
                  <div>
                    <strong>{reply.user.name}</strong>
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))}

              {comment.repliesCount > (repliesByCommentId[comment.id]?.length || 0) && (
                <button onClick={() => onLoadReplies(comment.id)}>
                  Load more replies
                </button>
              )}

              <ReplyInput
                currentUser={currentUser}
                onSubmit={(text) => onAddReply(comment.id, text)}
              />
            </div>
          </div>
        </div>
      ))}

      {hasMoreComments && (
        <button onClick={onLoadComments}>Load more comments</button>
      )}

      <div className="_add_comment">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
};


const ReplyInput = ({ currentUser, onSubmit }) => {
  const [text, setText] = useState("");
  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };
  return (
    <div className="_add_reply">
      <input
        type="text"
        placeholder="Reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Reply</button>
    </div>
  );
};

export default CommentList;