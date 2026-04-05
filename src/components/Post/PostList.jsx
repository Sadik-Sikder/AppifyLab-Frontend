import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, currentUser, handleLike, onAddComment, commentsByPostId,
  loadComments,
  hasMoreComments, loadReplies, hasMoreReplies }) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          handleLike={handleLike}
          onAddComment={onAddComment}
          comments={commentsByPostId[post.id]?.comments || []}
          onLoadComments={() => {
            const nextPage = (commentsByPostId[post.id]?.page || 0) + 1;
            loadComments(post.id, nextPage);
          }}
          hasMoreComments={hasMoreComments(post.id)}
          loadReplies={loadReplies}               
          hasMoreReplies={hasMoreReplies} 
        />
      ))}
    </>
  );
};

export default PostList;