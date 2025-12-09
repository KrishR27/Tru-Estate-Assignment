import { ConfigProvider } from 'antd';
import SalesManagementSystem from './components/SalesManagementSystem';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <SalesManagementSystem />
      </div>
    </ConfigProvider>
  );
}

export default App;
