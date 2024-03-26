import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
interface CheckOutButtonProps {
  webUrl: string;
  onClick: () => void; // Define the onClick handler
}

const CheckOutButton: React.FC<CheckOutButtonProps> = ({ webUrl, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label='checkout-products'
      className='bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm cursor-pointer mb-4'
    >
      Check Out
      <FontAwesomeIcon icon={faArrowRight} className='w-4 ml-2 inline-flex' />
    </button>
  );
};

export default CheckOutButton;
