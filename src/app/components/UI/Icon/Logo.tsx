import React from 'react';
import { Img } from 'app/components/UI/Img';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  width: ${(props: any) => props.width || '100px'};
  margin: ${(props: any) => props.margin || 0};
  text-align: center;
  overflow: hidden;
`;

export const Logo = props => {
  return (
    <LogoWrapper {...props}>
      <Img src="/logo.png" alt="Kandal Logo" />
    </LogoWrapper>
  );
};
