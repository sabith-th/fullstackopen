import React from "react";

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 5
  };

  return message && <div style={style}>{message}</div>;
};

export default Notification;
