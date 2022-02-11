import BackButton from '../UI/BackButton';
import ButtonPrimary from '../UI/ButtonPrimary';
import Card from '../UI/Card';

const CreateChatComponent = (props) => {
  return (
    <Card>
      <div className='flex w-full mb-6 flex-grow-0'>
        <BackButton />
        <div className='w-full flex justify-center items-center'>
          <h1 className='font-semibold text-2xl text-center'>Start chatting</h1>
        </div>
      </div>

      <div className='max-w-sm mb-6'>
        <p className='text-lg mb-2'>Step 1: create an identifier</p>
        <p className='w-auto'>
          Enter a random word of your choice or generate a random string of
          characters
        </p>
        <input className='mt-4 w-full' type='text' />
        <button className=''>Generate</button>
      </div>

      <ButtonPrimary onClick={props.onContinue}>Continue</ButtonPrimary>
    </Card>
  );
};

export default CreateChatComponent;
