import api from "./api";

export const fetchComments = async (postId, page = 1) => {
  const res = await api.get(`/posts/${postId}/comments?page=${page}`);
  return res.data; 
};

export const addComment = async (postId, text, parentComment = null) => {
  const res = await api.post(`/posts/${postId}/comment`, {
    text,
    parentComment,
  });
  return res.data; 
};


export const likeComment = async (commentId) => {
  const res = await api.post(`/posts/comments/${commentId}/like`);
  return res.data; 
};

export const fetchReplies = async (commentId, page = 1) => {
  const res = await api.get(`/posts/comment/${commentId}/replies?page=${page}`);
  return res.data; 
};

export const addReply = async (commentId, text) => {
  const res = await api.post(`/posts/comment/${commentId}/reply`, { text });
  return res.data; 
};