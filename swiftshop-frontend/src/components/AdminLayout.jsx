import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;