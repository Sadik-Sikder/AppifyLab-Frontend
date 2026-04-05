import React, { useState } from "react";
import defaultImg  from "../../assets/images/default.png";
import { formatDistanceToNowStrict } from "date-fns";

const PostCard = ({ postId, post = {}, currentUser = {}, handleLike, onAddComment, comments = [],           
  onLoadComments,         
  hasMoreComments = false  }) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const likes = post.likes || [];
  const commentsCount = post.commentsCount || 0;
  const isLiked = post.isLiked;
  const likesCount = post.likesCount;

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText("");
  };
  const handleToggleComments = () => {
    if (!showComments && !commentsLoaded) {
      onLoadComments(1);
      setCommentsLoaded(true);
    }

    setShowComments((prev) => !prev);
  };


  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src={post.user.avatar} alt="" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{post.user.name}</h4>
              <p className="_feed_inner_timeline_post_box_para">
                  {post.createdAt
                    ? formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true }) + ' . '
                    : "Just now"}
                <a href="#0">{post.visibility || "Public"}</a>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button className="_feed_timeline_post_dropdown_link">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
            <div className="_feed_timeline_dropdown">
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item"><a href="#0" className="_feed_timeline_dropdown_link">Save Post</a></li>
                <li className="_feed_timeline_dropdown_item"><a href="#0" className="_feed_timeline_dropdown_link">Turn On Notification</a></li>
                <li className="_feed_timeline_dropdown_item"><a href="#0" className="_feed_timeline_dropdown_link">Hide</a></li>
                <li className="_feed_timeline_dropdown_item"><a href="#0" className="_feed_timeline_dropdown_link">Edit Post</a></li>
                <li className="_feed_timeline_dropdown_item"><a href="#0" className="_feed_timeline_dropdown_link">Delete Post</a></li>
              </ul>
            </div>
          </div>
        </div>


        {post.text && <h4 className="_feed_inner_timeline_post_title">{post.text}</h4>}

        {post.image && (
          <div className="_feed_inner_timeline_image">
            <img src={post.image} alt="" className="_time_img" />
          </div>
        )}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {likes.slice(0, 5).map((like) => (
            <img key={like._id} src={like.profileImage || defaultImg} alt="" className="_react_img" />
          ))}
          {likes.length > 5 && <p className="_feed_inner_timeline_total_reacts_para">{likes.length - 5}+</p>}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1 cursor-pointer" onClick={handleToggleComments} ><span>{commentsCount}</span> Comment</p>
          <p className="_feed_inner_timeline_total_reacts_para2"><span>0</span> Share</p>
        </div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <button className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? "_feed_reaction_active" : ""}`} onClick={() => handleLike({ type: "post", id: post.id })}>
          <span className="_feed_inner_timeline_reaction_link">{post.isLiked ? "Unlike" : "Like"} ({likesCount})</span>
        </button>
        <button className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={handleToggleComments}>
          <span className="_feed_inner_timeline_reaction_link">
             <svg class="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                                        <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"></path>
                                                        <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"></path>
                                                    </svg>      Comment</span>
        </button>
        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <svg class="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                                        <path stroke="#000" stroke-linejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"></path>
                                                    </svg>Share</span>
        </button>
      </div>


      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form" onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }}>
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img src={currentUser.profileImage || "assets/images/comment_img.png"} alt="" className="_comment_img _nav_profile_img_round" />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon">
              <button  className="_feed_inner_comment_box_icon_btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
																		<path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clip-rule="evenodd"></path>
																	</svg></button>
             <button  className="_feed_inner_comment_box_icon_btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
																		<path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clip-rule="evenodd"></path>
																	</svg>
              </button>
              <button type="submit" className="_feed_inner_comment_box_icon_btn">
               <svg class="_mar_img" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
														<path fill="#000000" fill-rule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clip-rule="evenodd" />
													</svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="_timline_comment_main" style={{ display: showComments ? "block" : "none" }}>
        {hasMoreComments && (<div class="_previous_comment">
          <button type="button" class="_previous_comment_txt"  onClick={onLoadComments}>View more comments</button>
        </div>)}
        {comments.map((comment) => (
          <div key={comment._id} className="_comment_main">
            <div className="_comment_image">
              <a href="profile.html" className="_comment_image_link">
                <img src={comment.user?.avatar || "assets/images/txt_img.png"} alt="" className="_comment_img1" />
              </a>
            </div>
            <div className="_comment_area">
              <div className="_comment_details">
                <div className="_comment_details_top">
                  <div className="_comment_name">
                    <a href="profile.html">
                      <h4 className="_comment_name_title">{comment.user?.name || "Anonymous"}</h4>
                    </a>
                  </div>
                </div>
                <div className="_comment_status">
                  <p className="_comment_status_text">{comment.text}</p>
                </div>
                <div class="_total_reactions">
                  <div class="_total_react">
                    <span class="_reaction_like">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    </span>
                    
                  </div>
                  <span class="_total">
                    {comment.likesCount}
                  </span>
                </div>
               
              </div>
               <div class="_comment_reply">
                <div class="_comment_reply_num">
                  <ul class="_comment_reply_list">
                    <li onClick={() => handleLike({ type: "comment", id: comment.id })}><span>Like.</span></li>
                    <li><span>Reply.</span></li>
                    <li><span>Share</span></li>
                    <li><span class="_time_link">{comment.createdAt
                  ? formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: false }) + ' . '
                  : "Just now"}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;