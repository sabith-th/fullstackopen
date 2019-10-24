import React from "react";
import { connect } from "react-redux";

const Notification = ({ messages }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 5
  };

  const mapMessages = () =>
    messages.map(message => (
      <div style={style} key={message.id}>
        {message.message}
      </div>
    ));

  return <div>{mapMessages()}</div>;
};

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Notification);
