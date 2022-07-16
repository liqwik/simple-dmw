import React from 'react';
import Search from 'antd/lib/input/Search';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

type Props = {
  value?: string;
  onSearch?: any;
  onChange?: any;
};

export const MySearchField = ({ value, onChange, onSearch }: Props) => {
  const { t } = useTranslation();

  return (
    <Search
      placeholder={t(translations.search)}
      enterButton
      value={value}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
};
