import React from 'react';
import Header from './Header';
import '../../styles/Layout.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
