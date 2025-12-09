import { useState } from 'react';
import { Layout, Card, Select, Input, Space, Typography } from 'antd';
import { 
  SearchOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  FormOutlined,
  ToolOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import TransactionTable from './TransactionTable';
import { useTransactions } from '../hooks/useTransactions';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { Filters } from '../types';

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const SalesManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  
  const { transactions, pagination, loading, error } = useTransactions(filters, page);
  const { filterOptions } = useFilterOptions();

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilters({ ...filters, search: value });
    setPage(1);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Calculate statistics
  const totalUnits = pagination?.totalRecords || 0;
  const displayedTransactions = transactions || [];
  const totalAmount = displayedTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
  const totalDiscount = displayedTransactions.reduce((sum, t) => sum + (t.totalAmount - t.finalAmount), 0);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Sider 
        width={240} 
        style={{ 
          background: '#1f2937',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid #374151' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="#0F766E" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <Text strong style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>TruEstate</Text>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Anurag Yadav</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 0' }}>
          <div 
            onClick={() => setActiveTab('dashboard')}
            style={{ 
              padding: '10px 20px', 
              color: activeTab === 'dashboard' ? 'white' : '#9ca3af', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              background: activeTab === 'dashboard' ? '#374151' : 'transparent',
              borderLeft: activeTab === 'dashboard' ? '3px solid #0F766E' : 'none'
            }}
          >
            <DashboardOutlined />
            <span>Dashboard</span>
          </div>
          <div 
            onClick={() => setActiveTab('nexus')}
            style={{ 
              padding: '10px 20px', 
              color: activeTab === 'nexus' ? 'white' : '#9ca3af', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              background: activeTab === 'nexus' ? '#374151' : 'transparent',
              borderLeft: activeTab === 'nexus' ? '3px solid #0F766E' : 'none'
            }}
          >
            <AppstoreOutlined />
            <span>Nexus</span>
          </div>
          <div 
            onClick={() => setActiveTab('intake')}
            style={{ 
              padding: '10px 20px', 
              color: activeTab === 'intake' ? 'white' : '#9ca3af', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              background: activeTab === 'intake' ? '#374151' : 'transparent',
              borderLeft: activeTab === 'intake' ? '3px solid #0F766E' : 'none'
            }}
          >
            <FormOutlined />
            <span>Intake</span>
          </div>
          <div 
            onClick={() => setActiveTab('services')}
            style={{ 
              padding: '10px 20px', 
              color: activeTab === 'services' ? 'white' : '#9ca3af', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              background: activeTab === 'services' ? '#374151' : 'transparent',
              borderLeft: activeTab === 'services' ? '3px solid #0F766E' : 'none'
            }}
          >
            <ToolOutlined />
            <span>Services</span>
          </div>
          <div style={{ paddingLeft: '50px', marginTop: '10px' }}>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              <FileTextOutlined style={{ marginRight: '8px' }} />
              Pre-active
            </div>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              <CheckCircleOutlined style={{ marginRight: '8px' }} />
              Active
            </div>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              <CloseCircleOutlined style={{ marginRight: '8px' }} />
              Blocked
            </div>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              <CloseCircleOutlined style={{ marginRight: '8px' }} />
              Closed
            </div>
          </div>
          <div style={{ padding: '10px 20px', marginTop: '10px', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileTextOutlined />
            <span>Invoices</span>
          </div>
          <div style={{ paddingLeft: '50px', marginTop: '10px' }}>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              Proforma Invoices
            </div>
            <div style={{ padding: '8px 0', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>
              Final Invoices
            </div>
          </div>
        </div>
      </Sider>

      <Layout style={{ marginLeft: 240 }}>
        {/* Top Header */}
        <Header style={{ 
          background: 'white', 
          padding: '0 32px',
          borderBottom: '1px solid #e5e7eb',
          height: 'auto',
          minHeight: '88px',
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          paddingTop: '20px',
          paddingBottom: '20px'
        }}>
          <div>
            <Title level={3} style={{ margin: 0, marginBottom: '6px', color: '#111827', fontWeight: 700, lineHeight: '1.2' }}>
              Sales Management System
            </Title>
            <Text style={{ fontSize: '13px', color: '#6b7280' }}>Manage and track all your sales transactions</Text>
          </div>
        </Header>

        <Content style={{ padding: '40px 32px', background: '#f8fafc', minHeight: 'calc(100vh - 88px)' }}>
          {/* Statistics Cards */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
            <Card style={{ 
              flex: 1, 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Total units sold</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{totalUnits.toLocaleString()}</div>
            </Card>
            <Card style={{ 
              flex: 1, 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Total Amount ({displayedTransactions.length} SRs)</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>₹{totalAmount.toLocaleString()}</div>
            </Card>
            <Card style={{ 
              flex: 1, 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Total Discount ({displayedTransactions.length} SRs)</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>₹{totalDiscount.toLocaleString()}</div>
            </Card>
          </div>

          {/* Filters and Search Row */}
          <Card style={{ 
            marginBottom: '24px', 
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <Text strong style={{ fontSize: '15px', color: '#111827' }}>Filters</Text>
              <Text style={{ fontSize: '13px', color: '#6b7280', marginLeft: '8px' }}>
                · Refine your search results
              </Text>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '20px', alignItems: 'center' }}>
              <Select
                placeholder="Customer Region"
                mode="multiple"
                style={{ minWidth: '200px', flex: '1 1 200px' }}
                onChange={(value) => handleFilterChange('customerRegion', value)}
                allowClear
                size="large"
              >
                {filterOptions?.customerRegion?.map(region => (
                  <Option key={region} value={region}>{region}</Option>
                ))}
              </Select>

              <Select
                placeholder="Gender"
                mode="multiple"
                style={{ minWidth: '160px', flex: '1 1 160px' }}
                onChange={(value) => handleFilterChange('gender', value)}
                allowClear
                size="large"
              >
                {filterOptions?.gender?.map(gender => (
                  <Option key={gender} value={gender}>{gender}</Option>
                ))}
              </Select>

              <Select
                placeholder="Age Range"
                style={{ minWidth: '160px', flex: '1 1 160px' }}
                onChange={(value) => handleFilterChange('ageRange', value)}
                allowClear
                size="large"
              >
                <Option value="18-25">18-25</Option>
                <Option value="26-35">26-35</Option>
                <Option value="36-45">36-45</Option>
                <Option value="46-60">46-60</Option>
                <Option value="60+">60+</Option>
              </Select>

              <Select
                placeholder="Product Category"
                mode="multiple"
                style={{ minWidth: '200px', flex: '1 1 200px' }}
                onChange={(value) => handleFilterChange('productCategory', value)}
                allowClear
                size="large"
              >
                {filterOptions?.productCategory?.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>

              <Select
                placeholder="Tags"
                mode="multiple"
                style={{ minWidth: '160px', flex: '1 1 160px' }}
                onChange={(value) => handleFilterChange('tags', value)}
                allowClear
                size="large"
              >
                {filterOptions?.tags?.map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>

              <Select
                placeholder="Payment Method"
                mode="multiple"
                style={{ minWidth: '200px', flex: '1 1 200px' }}
                onChange={(value) => handleFilterChange('paymentMethod', value)}
                allowClear
                size="large"
              >
                {filterOptions?.paymentMethod?.map(method => (
                  <Option key={method} value={method}>{method}</Option>
                ))}
              </Select>

              <Select
                placeholder="Date"
                style={{ minWidth: '160px', flex: '1 1 160px' }}
                onChange={(value) => handleFilterChange('dateRange', value)}
                allowClear
                size="large"
              >
                <Option value="today">Today</Option>
                <Option value="week">This Week</Option>
                <Option value="month">This Month</Option>
                <Option value="year">This Year</Option>
              </Select>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '14px', 
              alignItems: 'center',
              paddingTop: '4px',
              borderTop: '1px solid #f3f4f6'
            }}>
              <Input
                placeholder="Search by name or phone number..."
                prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
                style={{ flex: 1 }}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                size="large"
              />
              <Select
                placeholder="Sort by: Customer Name (A-Z)"
                style={{ minWidth: '260px' }}
                onChange={(value) => handleFilterChange('sortBy', value)}
                size="large"
              >
                <Option value="customerName_asc">Customer Name (A-Z)</Option>
                <Option value="customerName_desc">Customer Name (Z-A)</Option>
                <Option value="date_desc">Date (Newest First)</Option>
                <Option value="date_asc">Date (Oldest First)</Option>
                <Option value="quantity_desc">Quantity (High to Low)</Option>
                <Option value="quantity_asc">Quantity (Low to High)</Option>
              </Select>
            </div>
          </Card>

          {/* Transaction Table */}
          <Card style={{ 
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <Text strong style={{ fontSize: '15px', color: '#111827' }}>Transaction Records</Text>
              <Text style={{ fontSize: '13px', color: '#6b7280', marginLeft: '8px' }}>
                · {pagination?.totalRecords?.toLocaleString() || 0} total transactions
              </Text>
            </div>
            <TransactionTable
              transactions={transactions}
              loading={loading}
              error={error}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SalesManagementSystem;
