import Card from './Components/UI/Card';
import ButtonPrimary from './Components/UI/ButtonPrimary';
import ButtonSecondary from './Components/UI/ButtonSecondary';
import React, { Fragment, useState } from 'react';
import CreateChatComponent from './Components/CreateChat/CreateChatComponent';

function App() {
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const startChattingClickHandler = (action) => {
    setIsCreatingChat(true);
  };

  const start = (
    <Fragment>
      <h1 className='text-xl mb-6'>
        <strong>Decentralised Chat App</strong>
      </h1>
      <ButtonPrimary onClick={startChattingClickHandler}>
        Start chatting
      </ButtonPrimary>
      <p className='my-2'>or</p>
      <ButtonSecondary>Accept an invite</ButtonSecondary>
    </Fragment>
  );

  return (
    <div className='flex h-screen justify-center items-center'>
      {isCreatingChat && <CreateChatComponent />}
      {!isCreatingChat && <Card>{start}</Card>}
    </div>
  );
}

export default App;
