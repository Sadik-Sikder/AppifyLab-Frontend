import React from "react";

const NotificationDropdown = ({ className = "" }) => {
  const notifications = [
    { name: "Steve Jobs", action: "posted a link in your timeline", img: "friend-req.png", time: "42 minutes ago" },
    { name: "Admin", action: "changed the name of the group Freelacer usa", img: "profile-1.png", time: "42 minutes ago" },
  ];

  return (
    <div id="_notify_drop"  className={`_notification_dropdown ${className}`}>
      <div className="_notifications_content">
        <h4 className="_notifications_content_title">Notifications</h4>
        <div className="_notification_box_right">
          <button type="button" className="_notification_box_right_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
              <circle cx="2" cy="2" r="2" fill="#C4C4C4"></circle>
              <circle cx="2" cy="8" r="2" fill="#C4C4C4"></circle>
              <circle cx="2" cy="15" r="2" fill="#C4C4C4"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div className="_notifications_drop_box">
        <div className="_notifications_drop_btn_grp">
          <button className="_notifications_btn_link">All</button>
          <button className="_notifications_btn_link1">Unread</button>
        </div>
        <div className="_notifications_all">
          {notifications.map((notif, index) => (
            <div key={index} className="_notification_box">
              <div className="_notification_image">
                <img src={`assets/images/${notif.img}`} alt="Image" className="_notify_img" />
              </div>
              <div className="_notification_txt">
                <p className="_notification_para">
                  <span className="_notify_txt_link">{notif.name}</span> {notif.action}.
                </p>
                <div className="_nitification_time">
                  <span>{notif.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;