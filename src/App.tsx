import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from '@emotion/styled';

import { UserList } from './components';
import { AppDispatch, RootState } from "./redux/poviders/store/store";
import { getUsers } from 'api/users/getUsersThunk';
import { userActions } from "api/users/getUsersSlice";
import { Loader, Search } from "components/shared";

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  
  .details {
    margin-top: 50px;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const App = () =>  {
  const [search, setSearch] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { users, loading, error } = useSelector( (state: RootState) => state.users)
  const [tempUsers, setTempUsers] = useState(users)
  const dispatch = useDispatch<AppDispatch>();

  const getUserHandler = () => {
    dispatch(getUsers())
  }

  useEffect(() => {
      getUserHandler()
  }, []);

  useEffect(() => {
      if (users) setTempUsers(users)
  }, [users]);

  useEffect( () => {
    if (search && users){
      const tempUsers = users.filter(({ name, username, email }) => {
        return name.includes(search)
          || username.includes(search)
          || email.includes(search)
      })
      setTempUsers(tempUsers)
    }
  }, [search, users] )

  const onChangeInput = useCallback((value: string | null, clear?: boolean) => {
    if (value) {
      setSearchParams({ ['search']: value });
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    if (clear){
      getUserHandler()
    }

    setSearch(value);
  }, [])

  const deleteUser = useCallback((id: number) => {
    dispatch(userActions.deleteUser(id))
  }, [])

  if (loading){
    return (
      <AppStyle>
        <div className='loading'>
          <Loader/>
        </div>
      </AppStyle>
    )
  }

  return (
    <AppStyle>
      <>
        <Search searchValue={searchQuery} onChangeInput={onChangeInput} />
        {!!tempUsers.length ? (
          <UserList
            searchValue={searchQuery}
            users={tempUsers}
            deleteUser={deleteUser}/>
        ) : (
          <div className='details'>
            <span>No result</span>
            {error && <span>{error}</span>}
          </div>
        )}
      </>
    </AppStyle>
  );
}
