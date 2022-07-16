import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/" type="button">
          Back Home
        </Link>
      }
    />
  );
}

export default NotFoundPage;
