import arrowRight from '../../resources/icons/ic_arrow_left_black.svg';

const BackButton = (props) => {
  return (
    <button className='rounded-xl bg-slate-300 w-12 hover:bg-slate-400'>
      <img src={arrowRight} alt='Back' />
    </button>
  );
};

export default BackButton;
