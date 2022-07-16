import styled from 'styled-components';
import { MiddleScreen } from 'app/components/UI/Layout';

export const LoginFormWrapper = styled(MiddleScreen)`
  max-width: 420px;
  width: 100%;

  form {
    max-width: 360px;
    margin: 0 auto;
  }

  .ant-typography {
    text-align: center;
  }
`;
