import { FC, memo, useCallback, useState } from "react";
import styled from "@emotion/styled";

import { User } from "types";
import { Modal } from 'components/shared';
import { CloseBtn } from 'components/shared';
import { replaceString } from 'utils';

interface UserProps {
  user: User;
  deleteUser: (id: number) => void;
  searchValue: string | null;
}

const UserItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  width: 300px;
  cursor: pointer;

  .user {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .user_body {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    
    .slug {
      color: red;
    }
    
    .user_info {
      display: flex;
      flex-direction: column;
    }

    button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .user_details {
    .user_details_info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 64px;
        margin-bottom: 10px;
      }

      p {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      span {
        font-size: 34px;
      }

    }
        
    .user_delete_btn {
      cursor: pointer;
      width: 200px;
      height: 50px;
      margin-top: 20px;
      font-size: 24px;
    }    
  }
  
  img {
    width: 20px;
    height: 20px;
  }
`;

export const UserItem: FC<UserProps> = memo(({ user, deleteUser, searchValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { name, username, email, id, address, company } = user

  const deleteUserItem = useCallback(() => {
    deleteUser(id)
  }, [id])

  const onToggleModal = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [isOpen])

  const replaceStringHelper = (temp: string | null) => {
    if (searchValue && temp?.includes(searchValue)){
      return replaceString(temp, searchValue)
    } else {
      return temp
    }
  }

    return (
        <UserItemStyle>
          <div className='user'>
            <div onClick={onToggleModal} className='user_body'>
              <p className='user_info'>
                <span>{replaceStringHelper(name)}</span>
                <span>{replaceStringHelper(username)}</span>
                <span>{replaceStringHelper(email)}</span>
              </p>
            </div>
            <CloseBtn onClick={deleteUserItem}/>
          </div>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={onToggleModal}>
                    <div className='user_details'>
                      <div className='user_details_info'>
                        <span className='name'>{name}</span>
                        <span>{`city - ${address.city}`}</span>
                        <span>{`street - ${address.street}`}</span>
                        <span>{`company - ${company.name}`}</span>
                      </div>
                      <button
                        className='user_delete_btn'
                        onClick={deleteUserItem}
                      >
                        Delete this user
                      </button>
                    </div>
              </Modal>
            )}
        </UserItemStyle>
    );
});
