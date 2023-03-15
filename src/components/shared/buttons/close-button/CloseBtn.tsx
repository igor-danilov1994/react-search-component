import React, { FC } from 'react';

interface CloseBtnProps {
  onClick: () => void
}

export const CloseBtn: FC<CloseBtnProps> = (props) => {
  const { onClick } = props

    return (
      <button onClick={onClick}>
        <img src="./close.svg" alt="icon" />
      </button>
    );
};