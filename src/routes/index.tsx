import type {RouteObject} from 'react-router-dom';
import {Outlet, redirect, useLoaderData, useRouteLoaderData} from 'react-router-dom';
import {ErrorBoundary} from '../components';
import {Home, Settings} from '../pages';

const Root = () => {
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('gameportalPoker Root', { gameportalData, gameportalPokerData, data });

  return <Outlet />;
};

type Props = {
  appPath?: string;
  features?: { name: string; hasFeature: boolean}[];
  isRemote?: boolean;
  token?: string;
};
export const getRoutes = (props: Props = {}): RouteObject[] => {
  const { appPath , features= [], isRemote = false, token } = props;

  return [
    {
      path: appPath ? `${appPath}/*` : '/',
      id: 'gameportalPoker',
      element: <Root />,
      errorElement: <ErrorBoundary />,
      loader(loader1Props) {
        console.log('gameportalPoker root loader', { loader1Props })

        return { appPath: appPath ?? '/', features, isRemote, token };
      },
      children: [
        { index: true, element: <Home /> },
        {
          path: 'settings/',
          element: <Settings />,
          loader(loader2props) {
            console.log('gameportalPoker settings loader', { loader2props })

            return { foo: 'bar' };
          },
        },
        { path: '*', loader: () => redirect(appPath ?? '/') },
      ],
    },
  ];
};

export default getRoutes();
