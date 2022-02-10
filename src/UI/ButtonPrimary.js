const ButtonPrimary = (props) => {
  return (
    <button
      onClick={props.onClick}
      className='bg-primary font-medium shadow-lg px-4 py-2 rounded-lg text-textColorWhite hover:bg-violet-600'
    >
      {props.children}
    </button>
  );
};

export default ButtonPrimary;
