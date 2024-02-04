import {memo, useEffect, useMemo} from 'react';
import {Outlet, useLoaderData, useOutletContext} from 'react-router-dom';
import {AppSettings} from '../../components';
import {useAuth} from '../../utils/hooks';
import type {AppContext} from '../../@types/global';

type Props = {};

const AppRoot = (_props: Props) => {
  const outletContext = useOutletContext<AppContext>();
  const { auth: authContext } = outletContext || {};
  const { idToken: hostIdToken } = authContext || {};
  const data = useLoaderData() as { isRemote: boolean; token: string };
  const { isRemote, token } = data || {};
  const auth = useAuth();

  const { isAuthenticated, setData: setAuthData } = auth;
  const hasToken = (isRemote && !!hostIdToken?.__raw?.length) || !!token.length;
  const newAuthData = useMemo(
    () => (isRemote ? { ...authContext } : { idToken: { __raw: token } }),
    [isRemote, authContext, token],
  );
  const context = useMemo(() => ({ auth }), [auth]);
  console.log('GameportalPokerAppRoot', { isRemote, hasToken, isAuthenticated, outletContext, data, context });

  useEffect(() => {
    console.log('GameportalPokerAppRoot - useEffect1', { hasToken, isAuthenticated });
    if (((hasToken && !isAuthenticated) || (!hasToken && isAuthenticated)) && setAuthData) {
      setAuthData(newAuthData);
    }
  }, [hasToken, isAuthenticated, newAuthData, setAuthData]);

  const getErrorMessage = (): string | undefined => {
    if (!isAuthenticated) {
      return 'Unauthorized';
    }

    return undefined;
  };
  const errorMessage = getErrorMessage();

  return (
    <>
      {!isRemote && <AppSettings />}
      {!errorMessage ? <Outlet context={context} /> : <div>{errorMessage}</div>}
    </>
  );
};

export default memo(AppRoot);
