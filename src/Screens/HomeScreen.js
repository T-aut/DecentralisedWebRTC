import strings from '../resources/constants/strings';
import ButtonPrimary from '../Components/UI/ButtonPrimary';
import ButtonSecondary from '../Components/UI/ButtonSecondary';
import Card from '../Components/UI/Card';

const HomeScreen = (props) => {
  return (
    <Card className='justify-center items-center'>
      <h1 className='text-2xl mb-6'>
        <strong>Decentralised Chat App</strong>
      </h1>
      <ButtonPrimary
        onClick={props.onNavigate.bind(this, strings.screens.CreateOfferScreen)}
      >
        Start chatting
      </ButtonPrimary>
      <p className='my-2'>or</p>
      <ButtonSecondary
        onClick={props.onNavigate.bind(
          this,
          strings.screens.AcceptInitiatorOfferScreen
        )}
      >
        Accept an invite
      </ButtonSecondary>
    </Card>
  );
};

export default HomeScreen;
