import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InfoBar from '../infoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import queryString from 'querystring';
import io from 'socket.io-client';

let socket;

function Chat() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:5000';

  const location = useLocation();
  useEffect(() => {
    const { name, room } = queryString.parse(location.search.slice(1));

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar roomName={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
