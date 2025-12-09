import { Select } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SortDropdownProps {
  onSortChange: (value: string) => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  return (
    <Select
      defaultValue="date-newest"
      style={{ width: 250 }}
      size="large"
      onChange={onSortChange}
      suffixIcon={<SortAscendingOutlined />}
    >
      <Option value="date-newest">Date (Newest First)</Option>
      <Option value="date-oldest">Date (Oldest First)</Option>
      <Option value="quantity-high">Quantity (High to Low)</Option>
      <Option value="quantity-low">Quantity (Low to High)</Option>
      <Option value="name-asc">Customer Name (A-Z)</Option>
      <Option value="name-desc">Customer Name (Z-A)</Option>
    </Select>
  );
};

export default SortDropdown;
