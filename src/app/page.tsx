"use client"
import MenuSystem from '@/components/menu-system';
import MainLayout from '@/components/layout/main-layout';
import { Provider } from 'react-redux';
import {store} from '@/redux/store';

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z"/>
              </svg>
            </span>
            <span className="text-gray-500">Menus</span>
          </div>
        </div>
        <MenuSystem />
      </div>

    </MainLayout>
  );
}