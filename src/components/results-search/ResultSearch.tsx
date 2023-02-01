import { FC } from 'react';
import styled from '@emotion/styled';

interface IProps {
  searchResultList: string[];
}

const ResultSearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  div {
    padding: 10px 0px;
    height: 80vh;
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
`;

export const ResultSearch: FC<IProps> = ({ searchResultList }) => {
  return (
    <ResultSearchStyle>
      <div>
        {searchResultList.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </div>
    </ResultSearchStyle>
  );
};
