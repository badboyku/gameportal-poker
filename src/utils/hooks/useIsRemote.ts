import {RouteObject, useMatches} from 'react-router-dom';

export const useIsRemote = () => {
  const matches = useMatches();

  return matches.some(({ handle }: RouteObject) => handle?.isRemote);
};
