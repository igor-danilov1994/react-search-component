import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

import './App.css';
import { ResultSearch, Search } from './components';
import { getData } from './moc-data';

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
`;

function App() {
  const [data, setData] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [search, setSearch] = useState<string | null>(searchQuery);

  useEffect(() => {
    if (!data.length) getList();
  }, [data]);

  async function getList() {
    const resp = await getData();

    if (resp) setData(resp.sort());
  }

  useEffect(() => {
    if (search && data) {
      const res = data.filter((item, index) => item[0] === search[0]);

      setSearchValue(res);
    } else {
      setSearchValue([]);
    }
  }, [search, data]);

  const onChangeInput = (value: string | null) => {
    if (value) {
      setSearchParams({ ['search']: value });
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    setSearch(value);
  };

  return (
    <AppStyle>
      <Search searchValue={searchQuery} onChangeInput={onChangeInput} />
      {!!searchValue.length || !search?.length ? (
        <ResultSearch searchResultList={searchValue} />
      ) : (
        <span>No result</span>
      )}
    </AppStyle>
  );
}

export default App;
