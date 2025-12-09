import { useState } from 'react';
import { Select, DatePicker, InputNumber, Button, Space, Tag, Collapse } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { Filters, FilterOptions } from '../types';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

interface FilterPanelProps {
  filterOptions: FilterOptions | null;
  onFilterChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  currentFilters: Filters;
}

const FilterPanel = ({ 
  filterOptions, 
  onFilterChange, 
  onClearFilters,
  currentFilters 
}: FilterPanelProps) => {
  const [localFilters, setLocalFilters] = useState<Partial<Filters>>({});

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const updateLocalFilter = (key: string, value: any) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const activeFilterCount = Object.values(currentFilters).filter(v => 
    v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <div className="mb-4">
      <Collapse
        defaultActiveKey={['filters']}
        expandIconPosition="end"
      >
        <Panel 
          header={
            <Space>
              <FilterOutlined />
              <span className="font-semibold">Filters</span>
              {activeFilterCount > 0 && (
                <Tag color="blue">{activeFilterCount} active</Tag>
              )}
            </Space>
          } 
          key="filters"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Customer Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Region
              </label>
              <Select
                mode="multiple"
                placeholder="Select regions"
                style={{ width: '100%' }}
                onChange={(value) => updateLocalFilter('customerRegion', value)}
                value={localFilters.customerRegion}
                options={filterOptions?.customerRegion?.map(r => ({ label: r, value: r }))}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <Select
                mode="multiple"
                placeholder="Select gender"
                style={{ width: '100%' }}
                onChange={(value) => updateLocalFilter('gender', value)}
                value={localFilters.gender}
                options={filterOptions?.gender?.map(g => ({ label: g, value: g }))}
              />
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber
                  placeholder="Min"
                  min={0}
                  max={100}
                  style={{ width: '50%' }}
                  onChange={(value) => updateLocalFilter('ageMin', value)}
                  value={localFilters.ageMin}
                />
                <InputNumber
                  placeholder="Max"
                  min={0}
                  max={100}
                  style={{ width: '50%' }}
                  onChange={(value) => updateLocalFilter('ageMax', value)}
                  value={localFilters.ageMax}
                />
              </Space.Compact>
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category
              </label>
              <Select
                mode="multiple"
                placeholder="Select categories"
                style={{ width: '100%' }}
                onChange={(value) => updateLocalFilter('productCategory', value)}
                value={localFilters.productCategory}
                options={filterOptions?.productCategory?.map(c => ({ label: c, value: c }))}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <Select
                mode="multiple"
                placeholder="Select tags"
                style={{ width: '100%' }}
                onChange={(value) => updateLocalFilter('tags', value)}
                value={localFilters.tags}
                options={filterOptions?.tags?.map(t => ({ label: t, value: t }))}
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <Select
                mode="multiple"
                placeholder="Select methods"
                style={{ width: '100%' }}
                onChange={(value) => updateLocalFilter('paymentMethod', value)}
                value={localFilters.paymentMethod}
                options={filterOptions?.paymentMethod?.map(p => ({ label: p, value: p }))}
              />
            </div>

            {/* Date Range */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <RangePicker
                style={{ width: '100%' }}
                onChange={(dates) => {
                  if (dates) {
                    updateLocalFilter('dateFrom', dates[0]?.format('YYYY-MM-DD'));
                    updateLocalFilter('dateTo', dates[1]?.format('YYYY-MM-DD'));
                  } else {
                    updateLocalFilter('dateFrom', undefined);
                    updateLocalFilter('dateTo', undefined);
                  }
                }}
                value={
                  localFilters.dateFrom && localFilters.dateTo
                    ? [dayjs(localFilters.dateFrom), dayjs(localFilters.dateTo)]
                    : null
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <Button 
              icon={<ClearOutlined />} 
              onClick={handleClear}
            >
              Clear All
            </Button>
            <Button 
              type="primary" 
              icon={<FilterOutlined />}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterPanel;
