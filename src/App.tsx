import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import settings from './utils/settings';

const App = () => {
  settings.init();

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default App;
