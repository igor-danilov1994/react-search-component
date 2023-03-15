import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { CloseBtn } from "components/shared/buttons";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ModalStyle = styled.div`
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    cursor: auto;

    .modal_overlay {
      width: 100%;
      height: 100%;
      background: rgba(0 0 0 / 60%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal_content {
      padding: 80px 20px;
      border-radius: 12px;
      background: white;
      transition: 0.3s transform;
      transform: scale(0.5);
      min-width: 90%;
      width: 80%;
      
      p {
        font-size: 24px;
        font-weight: 600;
      }

      button {
        cursor: pointer;
        border-radius: 16px;
        
        img {
          width: 50px;
          height: 50px;
        }
      }
    }

    .opened {
      pointer-events: auto;
      opacity: 1;
      z-index: 10;

      .modal_content {
        transform: scale(1);
      }
    }
    
    p {
      font-size: 24px;
    }
  }
`

export const Modal: FC<ModalProps> = ({ children , isOpen, onClose }) => {

    const onContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const onCloseHandler = () => {
      onClose()
    }

  console.log(151);

    return (
      <ModalStyle>
        <div className={`modal ${isOpen ? 'opened' : ''}`}>
          <div className='modal_overlay' onClick={onContentClick}>
            <div className='modal_content'>
              <CloseBtn onClick={onCloseHandler} />
              {children}
            </div>
          </div>
        </div>
      </ModalStyle>
    );
};