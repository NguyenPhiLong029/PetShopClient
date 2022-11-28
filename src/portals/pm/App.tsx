import { Layout } from 'antd';
import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import './app.scss';

const App: React.FC = () => {
  return (
    <Layout className="layout_app">
      <Sidebar />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
