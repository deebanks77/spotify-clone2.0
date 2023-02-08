import React from "react";
import classes from "./SidebarOptions.module.css";

function SidebarOptions(props) {
  const { title, Icon, bold, id, changeCurrentPlaylist } = props;

  return (
    <div className={classes.sidebarOptions}>
      {Icon && <Icon className={classes.sidebarOptions__icon}></Icon>}
      {bold ? (
        <h4 onClick={() => changeCurrentPlaylist && changeCurrentPlaylist(id)}>
          {title}
        </h4>
      ) : (
        <p onClick={() => changeCurrentPlaylist && changeCurrentPlaylist(id)}>
          {title}
        </p>
      )}
    </div>
  );
}

export default SidebarOptions;
