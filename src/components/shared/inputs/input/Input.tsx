import { FC, useEffect, useState } from 'react';

import { useDebounce } from 'hooks/useDebounce';

interface IProps {
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
}

export const Input: FC<IProps> = (props) => {
  const { value = '', onChange, placeholder } = props
  const [inputValue, setInputValue] = useState(value);
  const searchQuery = useDebounce(inputValue, 1000);

  const onChangeHandler = (value: string) => {
    setInputValue(value);

    if (!value.length){
      onChange('')
    }
  };

  useEffect( () => {
    if (searchQuery){
      onChange(searchQuery)
    }
  }, [searchQuery] )

  return (
      <input
        value={inputValue ?? ''}
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder={placeholder}
      />
  );
};
