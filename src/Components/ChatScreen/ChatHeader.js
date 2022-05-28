import { useState } from 'react';
import ButtonPrimary from '../UI/ButtonPrimary';

const ChatHeader = (props) => {
  return (
    <div className='flex flex-row bg-slate-50 px-10 py-2 h-8% w-screen'>
      <ButtonPrimary>Exit conversation</ButtonPrimary>
      <ButtonPrimary onClick={props.startCall}>Call</ButtonPrimary>
    </div>
  );
};

export default ChatHeader;
