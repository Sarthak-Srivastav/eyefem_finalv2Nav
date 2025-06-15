import React from 'react';
import MainNavbar from './MainNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow pt-16 sm:pt-20">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 