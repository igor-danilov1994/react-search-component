import { FC } from 'react';
import styled from '@emotion/styled';

import { User } from 'types';
import { UserItem } from './components';

interface UserListProps {
  users: User[];
  deleteUser: (id: number) => void;
  searchValue: string | null;
}

const UserListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
 
  .user_list_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
  }
  
  span {
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
  }
  
  .user_list {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    
    &:hover {
      border: 1px solid black;
    }

    @media (min-width: 320px) {
      &:hover {
        border: 1px solid transparent;
      }
    }
  }
  
`;

export const UserList: FC<UserListProps> = ({ users, deleteUser, searchValue }) => {
  return (
    <UserListStyle>
      <div className='user_list_wrapper'>
        {users.map((user, index) => {
          return (
            <div className='user_list' key={user.id}>
              <span>{++index}</span>
              <UserItem
                searchValue={searchValue}
                user={user}
                deleteUser={deleteUser}/>
            </div>
          )
        })}
      </div>
    </UserListStyle>
  );
};