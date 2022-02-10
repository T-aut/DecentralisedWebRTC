const ButtonSecondary = (props) => {
  return (
    <button
      onClick={props.onClick}
      className='bg-secondary font-medium shadow-lg px-4 py-2 rounded-lg text-textColorWhite hover:bg-zinc-400'
    >
      {props.children}
    </button>
  );
};

export default ButtonSecondary;
