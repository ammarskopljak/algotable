import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Table from './views/table/Table';
import UserInfo from './views/userInfo/UserInfo';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Table />,
    },
    {
      path: 'user/:userId',
      element: <UserInfo />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
