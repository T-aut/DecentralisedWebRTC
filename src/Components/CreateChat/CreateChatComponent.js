import ButtonPrimary from '../UI/ButtonPrimary';
import Card from '../UI/Card';

const CreateChatComponent = (props) => {
  return (
    <Card>
      <div className='flex w-full mb-6 flex-grow-0'>
        <button>BACK</button>
        <h1 className='w-full font-semibold text-xl text-center'>
          Start chatting
        </h1>
      </div>

      <div className='max-w-sm mb-6'>
        <p className='text-lg mb-2'>Step 1: create an identifier</p>
        <p className='w-auto'>
          Enter a random word of your choice or generate a random string of
          characters
        </p>
        <input type='text' />
      </div>

      <ButtonPrimary>Continue</ButtonPrimary>
    </Card>
  );
};

export default CreateChatComponent;
