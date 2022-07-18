import React, { useState } from 'react';
import { Space, Button, Select, DatePicker } from 'antd';
import { MySearchField } from 'app/components/UI/Field';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchFilterBar = ({ showReset, value, onReset, onSearch, onFilter }: any) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleSearch = val => {
    setTimeout(() => {
      onSearch(val);
    }, 300);
  };

  const handleChange = e => {
    const currentValue = e.target.value;

    setSearchValue(currentValue);
  };

  const handleReset = () => {
    setSearchValue('');
    onReset();
  };

  return (
    <Space>
      <RangePicker
        placeholder={['ចាប់ផ្តើមលិខិតចូល', 'បញ្ចប់លិខិតចូល']}
        style={{ width: '300px' }}
        onChange={value => onFilter({ docDateRange: value })}
      />
      <Select defaultValue="" style={{ width: 220 }} onChange={value => onFilter({ isSign: value })}>
        <Option value="">-- ជ្រើសរើសចរាចរឯកសារ --</Option>
        <Option value="1">មានចំណារ</Option>
        <Option value="0">គ្មានចំណារ</Option>
      </Select>

      <MySearchField value={searchValue} onChange={handleChange} onSearch={handleSearch} />

      {showReset && <Button onClick={handleReset}>សម្អាត</Button>}
    </Space>
  );
};

export default SearchFilterBar;
