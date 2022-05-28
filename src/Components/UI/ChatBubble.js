import Card from './Card';

const ChatBubble = (props) => {
  return (
    <Card
      className={`mb-3 px-6  ${props.className} max-w-screen-sm break-words overflow-hidden`}
    >
      <p>{props.text}</p>
    </Card>
  );
};

export default ChatBubble;
