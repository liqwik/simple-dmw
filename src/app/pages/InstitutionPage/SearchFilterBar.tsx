import React, { useState } from 'react';
import { MySearchField } from 'app/components/UI/Field';

const SearchFilterBar = ({ value, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSearch = val => {
    setTimeout(() => {
      onSearch(val);
    }, 300);
  };

  const handleChange = e => {
    const v = e.target.value;
    setSearchTerm(v);
  };

  return <MySearchField value={searchTerm} onSearch={handleSearch} onChange={handleChange} />;
};

export default SearchFilterBar;
