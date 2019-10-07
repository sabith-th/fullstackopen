import React from "react";

const Notification = ({ notification: { message, status } }) => {
  return (
    <div className={status === "success" ? "success" : "error"}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
