import BackButton from '../Components/UI/BackButton';
import ButtonPrimary from '../Components/UI/ButtonPrimary';
import Card from '../Components/UI/Card';
import { useState } from 'react';

const AcceptInitiatorOfferScreen = (props) => {
  const [initiatorOffer, setInitiatorOffer] = useState('');

  const onChange = (event) => {
    setInitiatorOffer(event.target.value);
  };

  const sendHello = () => {
    props.channel.send('Hello!');
  };

  const onContinue = async () => {
    await props.onAcceptOffer(initiatorOffer);
    //props.onNavigate(strings.screens.WaitingScreen);
  };

  return (
    <Card className='justify-center items-center'>
      <div className='flex w-full mb-6 flex-grow-0'>
        <BackButton />
        <div className='w-full flex justify-center items-center'>
          <h1 className='font-semibold text-2xl text-center'>Start chatting</h1>
        </div>
      </div>
      <div className='max-w-sm mb-6'>
        <p className='text-lg mb-2'>Step 1: accept the offer</p>
        <p className='w-auto'>
          Paste in the offer from your peer into the input below and press
          continue. Once completed, send your created offer string back to your
          peer.
        </p>
        {/* <input className='mt-4 w-full' type='text' value={identifier} /> */}
        <input value={initiatorOffer} onChange={onChange} />
        <p className='py-4'>{props.targetOffer}</p>
      </div>
      <ButtonPrimary onClick={onContinue}>Continue</ButtonPrimary>
      <ButtonPrimary onClick={sendHello}>Send hello</ButtonPrimary>
    </Card>
  );
};

export default AcceptInitiatorOfferScreen;
