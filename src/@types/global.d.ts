import type { DateTime } from 'luxon';

export type AuthData = {
  isAuthenticated?: boolean;
  authSetDateTime?: DateTime;
  accessToken?: string;
  idToken?: { __raw: string };
  user?: Record<string, unknown>;
};
export type AuthState = { setData?: (data: AuthData) => void } & AuthData;

export type AppContext = { auth?: AuthState };

export type Settings = { pokerApiUrl: string; token: string };

// Add custom react env vars here for runtime env vars.
export type ReactAppEnvVars = {
  NODE_ENV?: string;
  REACT_APP_POKER_API_URL: string;
  REACT_APP_TOKEN: string;
};

declare global {
  declare const IS_DEV: boolean;
  declare const IS_PROD: boolean;
  declare const SETTINGS_CODE: string;

  export interface Window {
    __RUNTIME_CONFIG__?: ReactAppEnvVars | {};
  }
}
