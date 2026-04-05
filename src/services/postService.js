import api from "./api";

export const fetchPosts = async (page = 1) => {
  const res = await api.get(`/posts?page=${page}`);
  return res.data;
};


export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return res.data;
};

export const likePost = async (postId) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};