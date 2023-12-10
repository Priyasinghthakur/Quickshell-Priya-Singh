import React from "react";
import profilePic from "../profileimage.png";
import "./card.css";

function Card({ key, task }) {
  return (
    <div className="card">
      <div className="top">
        <div className="toptext">{task?.id}</div>

        <img className="card-image" src={profilePic} alt="profile" />
      </div>
      <div className="midwid">
        <div className="mid">{task?.title} </div>
      </div>
      <div className="endwid">
        <div className="end">
          <span className="circle"></span> Feature Request
        </div>
      </div>
    </div>
  );
}

export default Card;
