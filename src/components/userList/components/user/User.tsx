import React, { FC, useState } from 'react';
import styled from "@emotion/styled";

import { User } from "types";
import { Modal } from 'components/shared';
import { CloseBtn } from 'components/shared';

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

export const UserItem: FC<UserProps> = ({ user, deleteUser, searchValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { name, username, email, id, address, company } = user

  const deleteUserItem = (id: number) => {
    deleteUser(id)
  }

  const onToggleModal = () => {
    setIsOpen(prev => !prev)
  }

  const replaceStr = (temp: string) => {
    let str = ''

    if (searchValue) {
      let regex = new RegExp(searchValue, "gi");
      str = temp.replace(regex, '<strong class="slug">$&</strong>');
    }
    return (
        <span dangerouslySetInnerHTML={{ __html: str }} />
    )
  }

    return (
        <UserItemStyle>
          <div className='user'>
            <div onClick={onToggleModal} className='user_body'>
              <p className='user_info'>
                <span>{name.includes(`${searchValue}`) ? replaceStr(name) : name}</span>
                <span>{username.includes(`${searchValue}`) ? replaceStr(username) : username}</span>
                <span>{email.includes(`${searchValue}`) ? replaceStr(email) : email}</span>
              </p>
            </div>
            <CloseBtn onClick={() => deleteUserItem(id)}/>
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
                      <button className='user_delete_btn' onClick={() => deleteUserItem(id)}>Delete this user</button>
                    </div>
              </Modal>
            )}
        </UserItemStyle>
    );
};