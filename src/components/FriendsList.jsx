import React, { useState } from "react";
import FriendCard from "./LeftSideBarComponents/LeftSidebar";

const friendsData = [
  { id: 1, name: "Steve Jobs", role: "CEO of Apple", image: "people1.png", online: false, lastSeen: "5 minute ago" },
  { id: 2, name: "Ryan Roslansky", role: "CEO of Linkedin", image: "people2.png", online: true },
  { id: 3, name: "Dylan Field", role: "CEO of Figma", image: "people3.png", online: true },
];

const FriendsList = () => {
  const [search, setSearch] = useState("");

  const filteredFriends = friendsData.filter(friend => 
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_feed_top_fixed">
        <div className="_feed_right_inner_area_card_content _mar_b24">
          <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
          <span className="_feed_right_inner_area_card_content_txt">
            <a className="_feed_right_inner_area_card_content_txt_link" href="find-friends.html">See All</a>
          </span>
        </div>
        <form className="_feed_right_inner_area_card_form" onSubmit={e => e.preventDefault()}>
          <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
            <circle cx="7" cy="7" r="6" stroke="#666"></circle>
            <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
          </svg>
          <input
            className="form-control me-2 _feed_right_inner_area_card_form_inpt"
            type="search"
            placeholder="input search text"
            aria-label="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
     
    </div>
  );
};

export default FriendsList;