import Text from 'antd/lib/typography/Text';
import React from 'react';

function DisplayUserName({ user }) {
  return (
    <Text>
      {user?.fn} {user?.ln}
    </Text>
  );
}

export default DisplayUserName;
