import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar/Navbar";
import MobileMenu from "../components/Navbar/MobileMenu";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";

import LeftSidebar from "../components/LeftSideBar/LeftSidebar";
import PostList from "../components/Post/PostList";
import RightSidebar from "../components/RightSideBar/RightSidebar";
import Stories from "../components/Stories/Stories";
import FeedCreatePost from "../components/Post/CreatePost";
import { useAuth } from "../context/AuthContext";
import { fetchPosts, likePost } from "../services/postService";
import { fetchComments, addComment, likeComment, fetchReplies } from "../services/commentService";



import yourStoryImg from "../assets/images/card_ppl1.png";
import publicStory1 from "../assets/images/card_ppl2.png";
import publicStory2 from "../assets/images/card_ppl3.png";
import publicStory3 from "../assets/images/card_ppl4.png";
import mobileStory from "../assets/images/mobile_story_img.png";
import mobileStory1 from "../assets/images/mobile_story_img1.png";
import mobileStory2 from "../assets/images/mobile_story_img2.png";
import miniPic from "../assets/images/mini_pic.png";
import defaultImg  from "../assets/images/default.png";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { user } = useAuth();

  const currentUser = {
    id: user?._id,
    name: user?.firstName + " " + user?.lastName,
    profileImage: user?.profileImage || "/assets/images/profile.png", 
  };
  const publicStories = [
    { img: publicStory1,  mini: miniPic,   name: "Ryan Roslansky" },
    { img: publicStory2,  mini: miniPic,   name: "Jane Doe" },
    { img: publicStory3,  mini: miniPic,   name: "John Smith" },
  ];

  const yourStory = { img: yourStoryImg, name: "Your Story",  mini: miniPic,  isYourStory: true };

  const storiesMobile = [
    { img: mobileStory, name: "Your Story", isYourStory: true },
    { img: mobileStory1, name: "Ryan..." },
    { img: mobileStory2, name: "Jane..." },
  ];

  const loadPosts = async (pageNumber = 1) => {
    try {
      const data = await fetchPosts(pageNumber);
      const mappedPosts = data.posts.map((post) => ({
        id: post._id,
        user: {
          id: post.author._id,
          name: `${post.author.firstName} ${post.author.lastName}`,
          avatar: post.author.profileImage || defaultImg,
        },
        text: post.text,
        image: post.image,
        createdAt: post.createdAt,
        privacy: post.privacy,
        likes: post.likes,
        likesCount: post.likesCount,
        commentsCount: post.commentsCount,
        isLiked: post.isLiked,
      }));
      setPosts((currentPosts) =>
        pageNumber === 1 ? mappedPosts : [...currentPosts, ...mappedPosts]
      );
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  const addNewPost = (post) => {
    const newPost = {
      id: post._id,
      user: {
        id: post.author._id,
        name: currentUser.name,
        avatar: currentUser.profileImage || defaultImg,
      },
      text: post.text,
      image: post.image,
      createdAt: post.createdAt,
      privacy: post.privacy,
      likes: post.likes,
      likesCount: post.likesCount || 0,
      commentsCount: post.commentsCount || 0,
      isLiked: post.isLiked,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [repliesByCommentId, setRepliesByCommentId] = useState({});

  const loadComments = async (postId, nextPage = 1) => {
    setCommentsByPostId(prev => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || { comments: [], page: 0, totalPages: 1 }),
        loading: true,
      }
    }));

    try {
      const data = await fetchComments(postId, nextPage);

      setCommentsByPostId(prev => ({
        ...prev,
        [postId]: {
          comments: [
            ...(prev[postId]?.comments || []),
            ...data.comments.map(comment => ({
              id: comment._id,
              user: {
                id: comment.author._id,
                name: `${comment.author.firstName} ${comment.author.lastName}`,
                avatar: comment.author.profileImage || defaultImg,
              },
              text: comment.text,
              likes: comment.likes,
              createdAt:comment.createdAt,
              likesCount: comment.likesCount || 0,
              repliesCount: comment.repliesCount,
              isLiked: comment.isLiked,
            }))
          ],
          page: data.page,
          totalPages: data.totalPages,
          loading: false
        }
      }));
      
    } catch (err) {
      console.error(err);
      setCommentsByPostId(prev => ({
        ...prev,
        [postId]: { ...(prev[postId] || {}), loading: false }
      }));
    }
  };
  const hasMoreComments = postId => {
    const postData = commentsByPostId[postId];
    return postData && postData.page < postData.totalPages;
  };


  const handleLike = async ({ type, id }) => {
    if (!user) return; 

    if (type === "post") {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === id) {
           const alreadyLiked = post.likes.some(
              (l) => l._id === currentUser.id
            );

            return {
              ...post,
              isLiked: !alreadyLiked,
              likesCount: alreadyLiked
                ? post.likesCount - 1
                : post.likesCount + 1,

              likes: alreadyLiked
                ? post.likes.filter((l) => l._id !== currentUser.id) 
                : [
                    ...post.likes,
                    {
                      _id: currentUser.id, 
                      firstName: currentUser.firstName,
                      lastName: currentUser.lastName,
                      profileImage: currentUser.profileImage,
                    },
                  ],
            };
          }
          return post;
        })
      );
    } else if (type === "comment") {
      setCommentsByPostId(prev => {
        const updatedComments = {};

        for (const postId in prev) {
          updatedComments[postId] = {
            ...prev[postId], 
            comments: prev[postId].comments.map(c => {
              if (c.id === id) {
                const alreadyLiked = c.isLiked;
                const likesArray = c.likes || [];

                return {
                  ...c,
                  isLiked: !alreadyLiked,
                  likesCount: alreadyLiked ? c.likesCount - 1 : c.likesCount + 1,
                  likes: alreadyLiked
                    ? likesArray.filter(uid => uid !== currentUser.id)
                    : [...likesArray, currentUser.id],
                };
              }
              return c;
            }),
          };
        }

        return updatedComments;
      });
    }

    try {
      if (type === "post") {
        await likePost(id);
      } else if (type === "comment") {
        await likeComment(id);
      }
    } catch (err) {
      console.error("Failed to like:", err);

      if (type === "post") {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === id) {
               const isCurrentlyLiked = post.likes.some(
                  (l) => l._id === currentUser.id
                );

                return {
                  ...post,
                  isLiked: !isCurrentlyLiked,
                  likesCount: isCurrentlyLiked
                    ? post.likesCount - 1
                    : post.likesCount + 1,

                  likes: isCurrentlyLiked
                    ? post.likes.filter((l) => l._id !== currentUser.id)
                    : [
                        ...post.likes,
                        {
                          _id: currentUser.id,
                          firstName: currentUser.firstName,
                          lastName: currentUser.lastName,
                          profileImage: currentUser.profileImage,
                        },
                      ],
                };
            }
            return post;
          })
        );
      } else if (type === "comment") {
        setCommentsByPostId((prev) => {
          const revertedComments = { ...prev };
          for (const postId in revertedComments) {
            revertedComments[postId].comments = revertedComments[postId].comments.map(
              (c) => {
                if (c.id === id) {
                  const newLikes = c.isLiked ? c.likesCount - 1 : c.likesCount + 1;
                  return { ...c, isLiked: !c.isLiked, likesCount: newLikes };
                }
                return c;
              }
            );
          }
          return revertedComments;
        });
      }
    }
  };


  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;

    setCommentsByPostId(prev => {
      const prevComments = prev[postId]?.comments || [];
      return {
        ...prev,
        [postId]: {
          ...(prev[postId] || { page: 1, totalPages: 1 }),
          comments: [
            ...prevComments,
            {
              id: Date.now(), 
              user: currentUser,
              text,
              likes: 0,
              repliesCount: 0,
              isLiked: false,
              temp: true, 
            },
          ],
        },
      };
    });

    try {
      const savedComment = await addComment(postId, text);

      setCommentsByPostId(prev => {
        const prevComments = prev[postId]?.comments || [];
        return {
          ...prev,
          [postId]: {
            ...(prev[postId] || {}),
            comments: prevComments.map(c =>
              c.temp ? {
                id: savedComment._id,
                user: {
                  id: savedComment.author._id,
                  name: `${savedComment.author.firstName} ${savedComment.author.lastName}`,
                  avatar: savedComment.author.profileImage || defaultImg,
                },
                text: savedComment.text,
                likes: savedComment.likes,
                likesCount: savedComment.likesCount || 0,
                repliesCount: savedComment.repliesCount,
                isLiked: savedComment.isLiked,
              } : c
            ),
          },
        };
      });

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
            : post
        )
      );

    } catch (err) {
      console.error("Failed to add comment:", err);

      setCommentsByPostId(prev => {
        const prevComments = prev[postId]?.comments || [];
        return {
          ...prev,
          [postId]: {
            ...(prev[postId] || {}),
            comments: prevComments.filter(c => !c.temp),
          },
        };
      });
    }
  };

  const loadReplies = async (commentId, nextPage = 1) => {
    setRepliesByCommentId(prev => ({
      ...prev,
      [commentId]: {
        ...(prev[commentId] || { replies: [], page: 0, totalPages: 1 }),
        loading: true,
      }
    }));

    try {
      const data = await fetchReplies(commentId, nextPage);

      setRepliesByCommentId(prev => ({
        ...prev,
        [commentId]: {
          replies: [
            ...(prev[commentId]?.replies || []),
            ...data.replies.map(r => ({
              id: r._id,
              user: {
                id: r.author._id,
                name: `${r.author.firstName} ${r.author.lastName}`,
                avatar: r.author.profileImage || defaultImg,
              },
              text: r.text,
              likes: r.likes,
              likesCount: r.likesCount,
              isLiked: r.isLiked,
              createdAt: r.createdAt,
            }))
          ],
          page: data.page,
          totalPages: data.totalPages,
          loading: false
        }
      }));

    } catch (err) {
      console.error("Failed to load replies:", err);
      setRepliesByCommentId(prev => ({
        ...prev,
        [commentId]: { ...(prev[commentId] || {}), loading: false }
      }));
    }
  };

  const hasMoreReplies = (commentId) => {
    const replyData = repliesByCommentId[commentId];
    return replyData && replyData.page < replyData.totalPages;
  };
  

  return (
    <div className={`_layout_main_wrapper ${darkMode ? "_dark_wrapper" : ""}`}>
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link" onClick={toggleDarkMode}>
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round">
                          
            </div>
          </div>
          <div className="_layout_change_btn_ic1">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" fill="none" viewBox="0 0 11 16">
              <path fill="#fff" d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z"/>
            </svg>
          </div>
          <div className="_layout_change_btn_ic2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4.389" stroke="#fff" transform="rotate(-90 12 12)"/>
              <path stroke="#fff" stroke-linecap="round" d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05"/>
            </svg>					  
          </div>
        </button>
      </div>
      <div className="_main_layout">
      <Navbar currentUser={currentUser} />
      <MobileMenu/>
      <MobileBottomNav/>
      <div className="container _custom_container">
				<div className="_layout_inner_wrap">
					<div className="row">

            <LeftSidebar />
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
							<div className="_layout_middle_wrap">
								<div className="_layout_middle_inner">
                  <Stories yourStory={yourStory} publicStories={publicStories}  mobileStories={storiesMobile} />
                  <FeedCreatePost onPostCreated={addNewPost} profileImage={currentUser.profileImage} />
                  <PostList
                    posts={posts}
                    currentUser={currentUser}
                    handleLike={handleLike}
                    onAddComment={handleAddComment}
                    commentsByPostId={commentsByPostId}
                    loadComments={loadComments}
                    hasMoreComments={hasMoreComments}     
                    loadReplies={loadReplies}                      
                    hasMoreReplies={hasMoreReplies} 
                  />
                  {page < totalPages && (
                    <div
                      className="_load_more_wrapper"
                      style={{ textAlign: "center", margin: "20px 0" }}
                    >
                      <button
                        type="button"
                        className="_load_more_btn"
                        style={{ border: "none", background: "#ffffff"}}
                        onClick={() => loadPosts(page + 1)} 
                      >
                        Load More Posts
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <RightSidebar/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Feed;