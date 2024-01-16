import config from '../config';
import type { LoaderFunctionArgs } from 'react-router-dom';

type Props = { appPath: string; isRemote: boolean };
export const appRootLoader = (props: Props) => (args: LoaderFunctionArgs) => {
  const { appPath, isRemote } = props;
  const { pokerApiUrl, token } = config;
  console.log('GameportalPoker AppRoot loader', { props, args, config });

  return { settings: { appPath, isRemote, pokerApiUrl, token } };
};
