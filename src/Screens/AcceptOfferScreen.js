import Card from '../Components/UI/Card';
import BackButton from '../Components/UI/BackButton';
import ButtonPrimary from '../Components/UI/ButtonPrimary';
import { useState } from 'react';

const AcceptOfferScreen = (props) => {
  const [identifier, setIdentifier] = useState('');

  const onIdentifierInput = (input) => {
    setIdentifier(input);
  };

  const onContinue = async () => {
    if (!identifier) return;

    const receiveMsg = (msg) => console.log(new TextDecoder().decode(msg.data));

    const ipfs = await IPFS.create({
      repo: 'ipfs-' + Math.random(),
      EXPERIMENTAL: {
        pubsub: true,
      },
      config: {
        Addresses: {
          Swarm: ['/ip4/192.168.1.79/udp/4001/quic/p2p/12D3<redacted>C16AKgEL'],
          API: '',
          Gateway: '',
        },
      },
    });

    await ipfs.pubsub.subscribe(identifier, receiveMsg);
    console.log(`subscribed to ${identifier}`);

    props.onNavigate(strings.screens.WaitingScreen);
  };

  return (
    <Card className='justify-center items-center'>
      <div className='flex w-full mb-6 flex-grow-0'>
        <BackButton />
        <div className='w-full flex justify-center items-center'>
          <h1 className='font-semibold text-2xl text-center'>
            Accept an invite
          </h1>
        </div>
      </div>

      <div className='max-w-sm mb-6'>
        <p className='text-lg mb-2'>Step 1: enter your code</p>
        <p className='w-auto'>
          Enter the code that your peer has shared with you.
        </p>
        <input
          className='mt-4 w-full'
          type='text'
          onInput={onIdentifierInput}
        />
        <button className=''>Generate</button>
      </div>

      <ButtonPrimary onClick={onContinue}>Continue</ButtonPrimary>
    </Card>
  );
};

export default AcceptOfferScreen;
