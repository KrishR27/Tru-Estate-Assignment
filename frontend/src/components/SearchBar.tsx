import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <Search
      placeholder="Name, Phone no."
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
      className="w-full"
    />
  );
};

export default SearchBar;
