import BackButton from '../Components/UI/BackButton';
import ButtonPrimary from '../Components/UI/ButtonPrimary';
import Card from '../Components/UI/Card';
import { useState, useEffect } from 'react';
import strings from '../resources/constants/strings';

const CreateOfferScreen = (props) => {
  // const onContinue = async () => {
  //   await props.onCreateOffer();
  // };

  useEffect(async () => {
    await props.onCreateOffer();
  }, []);

  const nextWindow = () => {
    props.onNavigate(strings.screens.AcceptTargetOfferScreen);
  };

  return (
    <Card className='justify-center items-center'>
      <div className='flex w-full mb-6 flex-grow-0'>
        <div className='w-full flex justify-center items-center'>
          <h1 className='font-semibold text-2xl text-center'>Start chatting</h1>
        </div>
      </div>
      <div className='max-w-sm mb-6'>
        <p className='text-lg mb-2'>Step 1: send the identifier</p>
        <p className='w-auto'>
          Send this line of text to your peer
        </p>
        {/* <input className='mt-4 w-full' type='text' value={identifier} /> */}
        <p className='py-4'>{props.offer}</p>
      </div>
      {/* <ButtonPrimary onClick={onContinue}>Continue</ButtonPrimary> */}
      <ButtonPrimary onClick={nextWindow}>I've sent the request</ButtonPrimary>
    </Card>
  );
};

export default CreateOfferScreen;
