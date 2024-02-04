import type {LoaderFunctionArgs} from 'react-router-dom';

export const settingsLoader = (props: LoaderFunctionArgs) => {
  console.log('GameportalPokerSettingsLoader', { props });

  return {};
};
