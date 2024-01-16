import { getEnvVars } from './env';

const { REACT_APP_POKER_API_URL, REACT_APP_TOKEN } = getEnvVars();

export default {
  pokerApiUrl: REACT_APP_POKER_API_URL ?? '',
  token: REACT_APP_TOKEN ?? '',
};
