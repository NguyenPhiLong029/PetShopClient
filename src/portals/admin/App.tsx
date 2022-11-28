import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from 'src/portals/admin/components/sidebar';
import './app.scss';

const { Content } = AntLayout;

const App: React.FC<any> = ({ blank }) => {
  if (blank) {
    return <Outlet />;
  }
  return (
    <AntLayout>
      <Sidebar />
      <AntLayout className="">
        <Content className="admin-layout ">
          <div className="admin-layout__content ">
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

App.displayName = 'App';
export default App;
