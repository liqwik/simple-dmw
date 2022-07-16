import React from 'react';
import { MySearchField } from 'app/components/UI/Field';

const SearchFilterBar = ({ value, onSearch }) => {
  const handleSearch = val => {
    setTimeout(() => {
      onSearch(val);
    }, 300);
  };

  return <MySearchField value={value} onSearch={handleSearch} />;
};

export default SearchFilterBar;
