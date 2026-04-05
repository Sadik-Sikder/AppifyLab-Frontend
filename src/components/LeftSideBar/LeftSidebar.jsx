import React from "react";
import Explore from './Explore';
import SuggestedPeople from './SuggestedPeople';
import Events from './Events';


const LeftSidebar = () => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_left_sidebar_wrap">
        <Explore />
        <SuggestedPeople />
        <Events />
      </div>
    </div>
  );
};

export default LeftSidebar;