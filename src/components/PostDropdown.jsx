import React from "react";

const PostDropdown = () => {
  return (
    <div className="_feed_timeline_dropdown">
      <ul className="_feed_timeline_dropdown_list">
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">Save Post</a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">Turn On Notification</a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">Hide</a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">Edit Post</a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">Delete Post</a>
        </li>
      </ul>
    </div>
  );
};

export default PostDropdown;