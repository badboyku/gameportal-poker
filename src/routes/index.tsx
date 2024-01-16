import { redirect } from 'react-router-dom';
import { Home, Settings } from '../pages';
import { appRootLoader } from '../utils/loaders';
import { AppRoot } from './AppRoot';
import { ErrorBoundary } from './ErrorBoundary';
import type { RouteObject } from 'react-router-dom';

type Props = { appPath?: string; isRemote?: boolean };

export const getRoutes = (props: Props = {}): RouteObject[] => {
  console.log('GameportalPokerGetRoutes', { props });
  const { appPath = '/', isRemote = false } = props;

  return [
    {
      path: appPath !== '/' ? `${appPath}/*` : appPath,
      id: 'gameportalPoker',
      element: <AppRoot />,
      errorElement: <ErrorBoundary />,
      loader: appRootLoader({ appPath, isRemote }),
      children: [
        { index: true, element: <Home /> },
        {
          path: 'settings/',
          element: <Settings />,
          loader: (settingsLoaderProps) => {
            console.log('GameportalPoker Settings loader', { settingsLoaderProps });

            return { foo: 'bar' };
          },
        },
        { path: '*', loader: () => redirect(appPath) },
      ],
    },
  ];
};

export default getRoutes();
