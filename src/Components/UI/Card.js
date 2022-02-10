const Card = (props) => {
  return (
    <div className='py-4 bg-slate-100 rounded-xl flex justify-center px-16 items-center flex-col w-auto h-auto'>
      {props.children}
    </div>
  );
};

export default Card;
