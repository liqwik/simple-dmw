import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { AppStorage } from 'utils';

function SwitchLanguage() {
  const { t, i18n } = useTranslation();

  const handleSwitchLang = lng => {
    i18n.changeLanguage(lng);
    AppStorage.setLang(lng);
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => handleSwitchLang('en')}>{t('en')}</Menu.Item>
          <Menu.Item onClick={() => handleSwitchLang('km')}>{t('km')}</Menu.Item>
        </Menu>
      }
    >
      <div>{t('languages')}</div>
    </Dropdown>
  );
}

export default SwitchLanguage;
