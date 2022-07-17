import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';

function SwitchLanguage() {
  const { t, i18n } = useTranslation();

  const handleSwitchLang = lng => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => handleSwitchLang('en')}>English</Menu.Item>
          <Menu.Item onClick={() => handleSwitchLang('km')}>ខ្មែរ</Menu.Item>
        </Menu>
      }
    >
      <div>{t('languages')}</div>
    </Dropdown>
  );
}

export default SwitchLanguage;
