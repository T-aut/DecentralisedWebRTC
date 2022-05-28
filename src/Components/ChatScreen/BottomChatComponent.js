import { useState } from 'react';
import ButtonPrimary from '../UI/ButtonPrimary';

const BottomChatComponent = (props) => {
  const [message, setMessage] = useState('');

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const onSendMessage = () => {
    if (!message) return;
    props.onSendMessage(message);
    setMessage('');
  };

  return (
    <div className='flex flex-row bg-slate-50 px-10 py-2 h-8% w-screen'>
      <input
        value={message}
        onChange={onMessageChange}
        className='border-2 mx-2 rounded-2xl px-2 w-3/4'
      />
      <ButtonPrimary onClick={onSendMessage}>Send message</ButtonPrimary>
    </div>
  );
};

export default BottomChatComponent;
