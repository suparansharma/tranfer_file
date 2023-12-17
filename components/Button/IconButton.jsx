import React from 'react';
import { FaPlus /* import other icons as needed */ } from 'react-icons/fa';

const IconButton = ({ iconName, buttonText, onClick }) => {
  const IconComponent = iconName; // Dynamically choose the icon based on the prop

  return (
    <button
      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 relative"
      type="submit"
      onClick={onClick}
    >
      <span className="mr-2 mt-1 border-r border-white px-2">
        <IconComponent />
      </span>
      <span className="capitalize">{buttonText}</span>
    </button>
  );
};

export default IconButton;
