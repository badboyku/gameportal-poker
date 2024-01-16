/* istanbul ignore file */
import type { ReactAppEnvVars } from '../@types/global';

const DefaultEnvVars: ReactAppEnvVars = {
  REACT_APP_POKER_API_URL: '',
  REACT_APP_TOKEN: '',
};

const getEnvVars = (): ReactAppEnvVars => {
  const { __RUNTIME_CONFIG__: env = DefaultEnvVars } = window;

  return { ...DefaultEnvVars, ...env };
};

const setEnvVars = (newEnvVars: ReactAppEnvVars): void => {
  window.__RUNTIME_CONFIG__ = { ...DefaultEnvVars, ...newEnvVars };
};

export { DefaultEnvVars, getEnvVars, setEnvVars };
