import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

const Notification = ({ notifications }) => {
  const mapMessages = () =>
    notifications.map(({ id, status, message }) => (
      <Message
        key={id}
        header={message}
        negative={status === "error"}
        positive={status === "success"}
      />
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
