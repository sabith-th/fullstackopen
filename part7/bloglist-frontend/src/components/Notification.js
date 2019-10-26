import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const Notification = ({ notifications }) => {
  const mapMessages = () =>
    notifications.map(({ id, status, message }) => (
      <div className={status === "success" ? "success" : "error"} key={id}>
        {message}
      </div>
    ));

  return <div>{mapMessages()}</div>;
};

Notification.propTypes = {
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

export default connect(mapStateToProps)(Notification);
