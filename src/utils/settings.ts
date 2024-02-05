import { getEnvVars, setEnvVars } from './env';
import type { Settings } from '../@types/global';

const { REACT_APP_POKER_API_URL: pokerApiUrl, REACT_APP_TOKEN: token } = getEnvVars();
const storageKey = 'gameportal-poker-settings';

export default {
  pokerApiUrl,
  token,

  init() {
    const cached = localStorage.getItem(storageKey) || '{}';
    this.updateSettings({ ...{ pokerApiUrl, token }, ...JSON.parse(cached) });
  },

  getSettings() {
    return this;
  },

  updateSettings(settings: Settings, persist = false) {
    Object.assign(this, settings);
    setEnvVars({ REACT_APP_POKER_API_URL: settings.pokerApiUrl, REACT_APP_TOKEN: settings.token });

    if (persist) {
      localStorage.setItem(storageKey, JSON.stringify(this));
    }
  },
};
