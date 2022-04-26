import { Fragment, useState } from 'react';
import ChatBubble from '../Components/UI/ChatBubble';
import BottomChatComponent from '../Components/ChatScreen/BottomChatComponent';
import ChatHeader from '../Components/ChatScreen/ChatHeader';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [init, setInit] = useState(false);

  if (!init) {
    if (props.channel) {
      props.channel.onmessage = (event) => {
        const message = event.data;

        // for accepting calls
        if (message.includes('/call {')) {
          acceptInitiatorCallSDP(message);
        } else if (message.includes('/accept-call {')) {
          acceptPeerCallSDP(message);
        }

        setMessages((prevState) => {
          return [
            ...prevState,
            {
              message,
              key: new Date().getTime(),
              isSender: false,
            },
          ];
        });
      };
      setInit(true);
    }
  }

  const acceptInitiatorCallSDP = async (message) => {
    // inits RTCPeerConnection on the receiving side
    await props.startCall();

    let _connection = props.connection;

    const offer = JSON.parse(message.substring(5));
    console.log(offer);
    await _connection.setRemoteDescription(offer);

    _connection.onicecandidate = (event) => {
      if (!event.candidate) {
        console.log(JSON.stringify(_connection.localDescription));
        props.channel.send(
          `/accept-call ${JSON.stringify(_connection.localDescription)}`
        );
      }
    };

    const answer = await _connection.createAnswer();
    await _connection.setLocalDescription(answer);
  };

  const acceptPeerCallSDP = async (message) => {
    const answer = JSON.parse(message.substring(12));
    console.log(answer);
    await props.connection.setRemoteDescription(answer);
  };

  const sendMessage = (message) => {
    if (props.channel) {
      props.channel.send(message);

      setMessages((prevState) => {
        return [
          ...prevState,
          { message: message, key: new Date().getTime(), isSender: true },
        ];
      });
    }
  };

  return (
    <Fragment>
      <ChatHeader startCall={props.initiateCall} />
      <div className='flex flex-col-reverse px-6 overflow-auto py-2 w-full h-full'>
        <ul>
          {messages.map((message) => {
            if (message.isSender)
              return (
                <li key={message.key}>
                  <ChatBubble text={message.message} />
                </li>
              );
            else
              return (
                <li key={message.key}>
                  <div className='flex flex-row justify-end'>
                    <ChatBubble
                      text={message.message}
                      key={message.key}
                      className='bg-rose-400'
                    />
                  </div>
                </li>
              );
          })}
        </ul>
      </div>

      <BottomChatComponent onSendMessage={sendMessage} />
    </Fragment>
  );
};

export default ChatScreen;
