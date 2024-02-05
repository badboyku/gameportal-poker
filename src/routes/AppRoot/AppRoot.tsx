import { memo, useEffect, useMemo } from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { AppSettings } from '../../components';
import { useAuth } from '../../utils/hooks';
import type { AppContext } from '../../@types/global';

type Props = {};

const AppRoot = (_props: Props) => {
  const outletContext = useOutletContext<AppContext>();
  const { auth: hostAuthState } = outletContext || {};
  const remoteAuthState = useAuth();
  const data = useLoaderData() as { isRemote: boolean; token: string };
  const { isRemote, token } = data || {};

  const authState = isRemote && hostAuthState ? hostAuthState : remoteAuthState;
  const { isAuthenticated, idToken, setData: setAuthData } = authState;
  const hasToken = (isRemote && !!idToken?.__raw?.length) || !!token.length;
  const newAuthState = useMemo(
    () => ({ ...authState, ...(!isRemote ? { isAuthenticated: hasToken, idToken: { __raw: token } } : {}) }),
    [authState, isRemote, hasToken, token],
  );

  const context = useMemo(() => ({ auth: newAuthState }), [newAuthState]);

  console.log('GameportalPokerAppRoot', {
    outletContext,
    context,
    data,
    hasToken,
    isAuthenticated,
    idToken,
    remoteAuthState,
    hostAuthState,
    newAuthState,
  });

  useEffect(() => {
    console.log('GameportalPokerAppRoot - useEffect1', { hasToken, isAuthenticated });
    if (((hasToken && !isAuthenticated) || (!hasToken && isAuthenticated)) && setAuthData) {
      setAuthData(newAuthState);
    }
  }, [hasToken, isAuthenticated, newAuthState, setAuthData]);

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
