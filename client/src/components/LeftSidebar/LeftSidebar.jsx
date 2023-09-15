import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import {  useSelector } from "react-redux";
import "./LeftSidebar.css"; // Import your CSS file for styling

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <div className={`left-sidebar ${window.innerWidth < 800 ? 'small-screen' : ''}`}>
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <HomeIcon fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <TagIcon fontSize="large" />
            <p>Explore</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <PersonIcon fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        {/* <div>
          <p className="font-bold">{currentUser.username}</p>
          <p className="font-bold">@{currentUser.username}</p>
        </div> */}

      </div>
    </div>
  );
};

export default LeftSidebar;
