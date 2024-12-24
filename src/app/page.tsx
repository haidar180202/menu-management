import MenuSystem from '@/components/menu-system';
import MainLayout from '@/components/layout/main-layout';
import { FaFolder } from 'react-icons/fa';

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <FaFolder className="" />
            </span>
            <span className="text-gray-500">
              /
            </span>
            <span className="text-gray-500">Menus</span>
          </div>
        </div>
        <MenuSystem />
      </div>
    </MainLayout>
  );
}