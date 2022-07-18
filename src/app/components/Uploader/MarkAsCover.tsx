import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const MarkAsCoverWrapper = styled.div`
  button {
    width: 100%;
    display: block;
  }
`;

function MarkAsCover({ originalNode, file, onMarkAsCover }: any) {
  const isMarkAsCover = () => {
    return file.markAsCover ? true : false;
  };

  return (
    <MarkAsCoverWrapper>
      <div>{originalNode}</div>

      <Button size="small" type={isMarkAsCover() ? 'primary' : 'default'} onClick={() => onMarkAsCover(file)}>
        Mark as cover
      </Button>
    </MarkAsCoverWrapper>
  );
}

export default MarkAsCover;
