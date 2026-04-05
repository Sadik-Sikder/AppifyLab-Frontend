const StoryCardMobile = ({ type, data }) => {
  return (
    <li className="_feed_inner_ppl_card_area_item">
      <a href={data.link || "#0"} className="_feed_inner_ppl_card_area_link">
        <div
          className={
            type === "your"
              ? "_feed_inner_ppl_card_area_story"
              : data.active
              ? "_feed_inner_ppl_card_area_story_active"
              : "_feed_inner_ppl_card_area_story_inactive"
          }
        >
          <img src={data.img} alt={data.name} className={type === "your" ? "_card_story_img" : "_card_story_img1"} />
        </div>
        <p className="_feed_inner_ppl_card_area_link_txt">{type === "your" ? "Your Story" : data.name}</p>
      </a>
    </li>
  );
};

export default StoryCardMobile;