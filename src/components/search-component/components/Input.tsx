import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDebounce } from 'hooks/useDebounce';

interface IProps {
  valueInput: string | null;
  onChangeInput: (value: string | null) => void;
}

const InputStyle = styled.div`
  border-radius: 4px;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    height: 100%;
    padding: 8px 5px 8px 30px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 12px;
  }

  img {
    position: absolute;
    left: 0;

    &:last-child {
      left: auto;
      right: 0;
      cursor: pointer;
    }
  }
  &:hover {
    color: white;
  }
`;

export const Input: FC<IProps> = ({ valueInput = '', onChangeInput }) => {
  const [value, setValue] = useState(valueInput);
  const searchQuery = useDebounce(value, 1000);

  const onChangeHandler = (value: string | null) => {
    setValue(value);
  };

  useEffect(() => {
    onChangeInput(searchQuery);
  }, [searchQuery]);

  return (
    <InputStyle>
      <img src="./search.svg" alt="icon" />
      <input
        value={value ?? ''}
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="search"
      />
      <img onClick={() => onChangeHandler(null)} src="./close.svg" alt="icon" />
    </InputStyle>
  );
};
