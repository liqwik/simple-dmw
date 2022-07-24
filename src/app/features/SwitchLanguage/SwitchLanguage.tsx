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
        <Menu
          items={[
            {
              key: 'en',
              label: t('en'),
              onClick: () => handleSwitchLang('en'),
            },
            {
              key: 'km',
              label: t('km'),
              onClick: () => handleSwitchLang('km'),
            },
          ]}
        />
      }
    >
      <div>{t('languages')}</div>
    </Dropdown>
  );
}

export default SwitchLanguage;
