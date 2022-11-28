import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import './app.scss';

const { Content } = AntLayout;

const App: React.FC<any> = () => {
  return (
    <AntLayout>
      <Content className="auth-layout__content">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

App.displayName = 'App';
export default App;
