import { useState } from 'react';

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
      <input value={message} onChange={onMessageChange} />
      <button onClick={onSendMessage}>Send message</button>
    </div>
  );
};

export default BottomChatComponent;
