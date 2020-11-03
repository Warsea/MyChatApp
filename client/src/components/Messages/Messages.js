import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import './messages.css';

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
          {/* <p>
            {message}, {name}
          </p> */}
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
