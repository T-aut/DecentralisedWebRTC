const Card = (props) => {
  return (
    <div
      className={`py-4 px-4 bg-slate-100 rounded-xl flex flex-col justify-start items-start w-fit ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
