import settings from '../settings';
import type { LoaderFunctionArgs } from 'react-router-dom';

export const appRootLoader = (isRemote: boolean) => (props: LoaderFunctionArgs) => {
  console.log('GameportalPokerAppRootLoader', { isRemote, settings, props });
  const { token } = settings;

  return { isRemote, token };
};
