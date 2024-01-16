import { memo, useEffect, useMemo } from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../utils/hooks';
import type { AppContext, SettingsData } from '../../@types/global';

type Props = {};

const AppRoot = (_props: Props) => {
  const { settings } = useLoaderData() as { settings: SettingsData };
  const { isRemote, token } = settings;

  const outletContext = useOutletContext<AppContext>();
  const { auth: authContext } = outletContext || {};
  const {
    isAuthenticated: hostIsAuthenticated,
    accessToken: hostAccessToken,
    idToken: hostIdToken,
    user: hostUser,
  } = authContext || {};

  const auth = useAuth();
  const { isAuthenticated, setData } = auth;
  const hasToken = (isRemote && !!hostIdToken?.__raw) || !!token;

  useEffect(() => {
    console.log('GameportalPokerAppRoot - useEffect1', { hasToken, isAuthenticated });
    if (hasToken && !isAuthenticated) {
      if (setData) {
        console.log('GameportalPokerAppRoot - useEffect1 before setData');
        const data = isRemote
          ? { isAuthenticated: hostIsAuthenticated, accessToken: hostAccessToken, idToken: hostIdToken, user: hostUser }
          : { isAuthenticated: true, idToken: { __raw: token } };
        setData(data);
      }
    }
  }, [
    hasToken,
    isAuthenticated,
    isRemote,
    hostIsAuthenticated,
    hostAccessToken,
    hostIdToken,
    hostUser,
    token,
    setData,
  ]);

  const context = useMemo(() => ({ auth, settings }), [auth]);
  console.log('GameportalPokerAppRoot', { context });

  const getErrorMessage = (): string | undefined => {
    if (!isAuthenticated) {
      return 'Unauthorized';
    }

    return undefined;
  };
  const errorMessage = getErrorMessage();

  return (
    <>
      {!isRemote && <div>Show hidden secret menu</div>}
      {!errorMessage ? <Outlet context={context} /> : <div>{errorMessage}</div>}
    </>
  );
};

export default memo(AppRoot);
