import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export function MyIconButton({ children, icon, onClick }) {
  return (
    <Button type="text" size="small" icon={icon} onClick={onClick}>
      {children}
    </Button>
  );
}

MyIconButton.propsTypes = {
  children: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
