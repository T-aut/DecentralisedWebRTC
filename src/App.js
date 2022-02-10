import Card from './UI/Card';
import Button from './UI/Button';
import ButtonPrimary from './UI/ButtonPrimary';
import ButtonSecondary from './UI/ButtonSecondary';

function App() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Card>
        <h1 className='text-xl mb-6'>
          <strong>Decentralised Chat App</strong>
        </h1>
        <ButtonPrimary>Start chatting</ButtonPrimary>
        <p className='my-2'>or</p>
        <ButtonSecondary>Accept an invite</ButtonSecondary>
      </Card>
    </div>
  );
}

export default App;
