import PropTypes from "prop-types";
import React from "react";

const Notification = ({ notification: { message, status } }) => {
  return (
    <div className={status === "success" ? "success" : "error"}>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

export default Notification;
