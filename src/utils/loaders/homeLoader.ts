import type {LoaderFunctionArgs} from 'react-router-dom';

export const homeLoader = (props: LoaderFunctionArgs) => {
  console.log('GameportalPokerHomeLoader', { props });

  return {};
};
