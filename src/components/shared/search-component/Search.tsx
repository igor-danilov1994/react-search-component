import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { SearchInput } from 'components';

interface IProps {
  searchValue: string | null;
  onChangeInput: (value: string | null, clear?: boolean) => void;
}

const SearchStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 10px;
  width: 100%;
  background: white;
  
   span {
    font-size: 24px;
    font-weight: 600;
    margin-right: 10px;
  }
`;

export const Search: FC<IProps> = memo(({ searchValue, onChangeInput }) => {
  return (
    <SearchStyle>
      <span>Search</span>
      <SearchInput valueInput={searchValue} onChangeInput={onChangeInput} />
    </SearchStyle>
  );
});
