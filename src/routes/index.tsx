import { redirect } from 'react-router-dom';
import { Home, Settings } from '../pages';
import { appRootLoader, homeLoader, settingsLoader } from '../utils/loaders';
import { AppRoot } from './AppRoot';
import { ErrorBoundary } from './ErrorBoundary';
import type { RouteObject } from 'react-router-dom';

type Props = { appPath?: string; isRemote?: boolean };

export const getRoutes = (props: Props = {}): RouteObject[] => {
  console.log('GameportalPokerGetRoutes', { props });
  const { appPath = '/', isRemote = false } = props;

  return [
    {
      id: 'gameportalPoker',
      path: appPath !== '/' ? `${appPath}/*` : appPath,
      element: <AppRoot />,
      errorElement: <ErrorBoundary />,
      loader: appRootLoader(isRemote),
      children: [
        { index: true, element: <Home />, loader: homeLoader },
        { path: 'settings/', element: <Settings />, loader: settingsLoader },
        { path: '*', loader: () => redirect(appPath) },
      ],
    },
  ];
};

export default getRoutes();
