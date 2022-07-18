import React from 'react';
import { MySearchField } from 'app/components/UI/Field/MySearchField';

export const SearchFilterBar = ({ value, onSearch, onChange }: any) => {
  const handleSearch = val => {
    setTimeout(() => {
      onSearch(val);
    }, 300);
  };

  return <MySearchField value={value} onSearch={handleSearch} onChange={onChange} />;
};
