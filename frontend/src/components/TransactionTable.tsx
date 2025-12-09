import { Table, Pagination, Alert, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Transaction, PaginationInfo } from '../types';
import { formatDate } from '../utils/formatters';
import { CopyOutlined } from '@ant-design/icons';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  onPageChange: (page: number) => void;
}

const TransactionTable = ({
  transactions,
  loading,
  error,
  pagination,
  onPageChange,
}: TransactionTableProps) => {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 120,
      fixed: 'left',
      render: (id: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{id}</span>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 130,
      render: (id: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{id}</span>
          <CopyOutlined style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '12px' }} />
        </div>
      )
    },
    {
      title: 'Customer name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 140,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
      render: (phone: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{phone}</span>
          <CopyOutlined style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '12px' }} />
        </div>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      align: 'center',
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
      width: 150,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
      render: (qty: number) => <span style={{ fontWeight: 500 }}>{qty}</span>,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 130,
      align: 'right',
      render: (amount: number) => `₹ ${amount.toLocaleString()}`,
    },
    {
      title: 'Customer region',
      dataIndex: 'customerRegion',
      key: 'customerRegion',
      width: 140,
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
      width: 120,
    },
    {
      title: 'Employee name',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 150,
    },
  ];

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={transactions}
        loading={loading}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 1800 }}
        size="small"
        locale={{
          emptyText: <Empty description="No transactions found" />,
        }}
        style={{
          fontSize: '13px'
        }}
      />

      {pagination && pagination.totalRecords > 0 && (
        <div style={{ 
          marginTop: '24px', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0',
          borderTop: '1px solid #f3f4f6'
        }}>
          <Pagination
            current={pagination.currentPage}
            total={pagination.totalRecords}
            pageSize={pagination.recordsPerPage}
            onChange={onPageChange}
            showSizeChanger={false}
            showTotal={(total, range) => 
              `Showing ${range[0]}-${range[1]} of ${total.toLocaleString()} transactions`
            }
            style={{ 
              fontSize: '13px',
              fontWeight: 500
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
