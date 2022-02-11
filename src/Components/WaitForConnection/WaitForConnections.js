import { Fragment } from 'react/cjs/react.production.min';
import BackButton from '../UI/BackButton';
import ButtonPrimary from '../UI/ButtonPrimary';
import Card from '../UI/Card';
import Loader from '../UI/Loader/Loader';

const WaitForConnection = (props) => {
  const loader = () => {
    var result = 'loader';
    var n = 0;
    while (n < 0) {
      result += ' box box ' + n++;
    }
    result += ' ground';
    return <div className='result' />;
  };

  return (
    <div>
      <Card>
        <div className='flex w-full mb-6 flex-grow-0'>
          <BackButton />
          <div className='w-full flex justify-center items-center'>
            <h1 className='font-semibold text-2xl text-center'>
              Start chatting
            </h1>
          </div>
        </div>

        <div className='max-w-sm mb-6'>
          <p className='text-lg mb-2'>Step 3: wait for response</p>
          <p className='w-auto'>
            After your peer enters your identifier, necessary information will
            be exchanged. This may take a couple of minutes
          </p>
        </div>
      </Card>

      <Loader />
    </div>
  );
};

export default WaitForConnection;
