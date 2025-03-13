import React from 'react';
import '../styles/FloatingAddButton.scss';

type Props = {
  onClick: () => void;
};

const FloatingAddButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="floating-add-button" onClick={onClick}>
      добавить
    </button>
  );
};

export default FloatingAddButton;
