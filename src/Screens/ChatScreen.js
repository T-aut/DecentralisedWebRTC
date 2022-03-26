import { Fragment, useState } from 'react';
import ChatBubble from '../Components/UI/ChatBubble';
import BottomChatComponent from '../Components/ChatScreen/BottomChatComponent';
import ButtonPrimary from '../Components/UI/ButtonPrimary';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [init, setInit] = useState(false);

  if (!init) {
    if (props.channel) {
      props.channel.onmessage = (event) => {
        setMessages((prevState) => {
          return [
            ...prevState,
            {
              message: event.data,
              key: new Date().getTime(),
              isSender: false,
            },
          ];
        });
      };
      setInit(true);
    }
  }

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
      <BottomChatComponent />
      <div className='flex flex-col px-6 overflow-auto py-2 w-full h-full'>
        {messages.map((message) => {
          if (message.isSender)
            return <ChatBubble key={message.key} text={message.message} />;
          else
            return (
              <div className='flex flex-row justify-end'>
                <ChatBubble
                  text={message.message}
                  key={message.key}
                  className='bg-rose-300'
                />
              </div>
            );
        })}
      </div>
      <BottomChatComponent onSendMessage={sendMessage} />
    </Fragment>
  );
};

export default ChatScreen;
