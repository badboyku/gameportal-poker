import { memo, useCallback, useEffect, useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import { useAuth } from '../../utils/hooks';
import settings from '../../utils/settings';
import type { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import './styles.css';
import type { Settings } from '../../@types/global';

type Props = {};

const AppSettings = (_props: Props) => {
  const { pokerApiUrl, token } = settings;
  const { setData: setAuthData } = useAuth();
  const revalidator = useRevalidator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [keys, setKeys] = useState('');
  const [formData, setFormData] = useState<Settings>({ pokerApiUrl, token });
  const [doRevalidate, setDoRevalidate] = useState(false);

  const fields: { label: string; name: keyof Settings }[] = [
    { label: 'Poker API Url', name: 'pokerApiUrl' },
    { label: 'Token', name: 'token' },
  ];

  useEffect(() => {
    if (keys === SETTINGS_CODE) {
      setIsMouseOn(false);
      setKeys('');
      setIsModalOpen(true);
    }
  }, [keys]);
  useEffect(() => {
    if (doRevalidate) {
      setDoRevalidate(false);
      revalidator.revalidate();
    }
  }, [doRevalidate, revalidator]);

  const closeButtonHandleOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if ([' ', 'Enter'].includes(event.key)) {
      setIsModalOpen(false);
    }
  }, []);
  const closeButtonHandleOnMouseDown = useCallback((event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
  }, []);

  const formHandleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      settings.updateSettings({ pokerApiUrl: formData.pokerApiUrl, token: formData.token }, true);
      if (setAuthData) {
        setAuthData({ idToken: { __raw: formData.token } });
      }
      setIsModalOpen(false);
      setDoRevalidate(true);
    },
    [setAuthData, formData.token, formData.pokerApiUrl],
  );
  const formInputHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const settingsButtonHandleOnKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (isMouseOn && !isModalOpen) {
        setKeys(`${keys}${event.key}`);
      }
    },
    [isMouseOn, isModalOpen, keys],
  );
  const settingsButtonHandleOnMouseDown = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (!isModalOpen && event.button === 0) {
        setIsMouseOn(true);
      }
    },
    [isModalOpen],
  );
  const settingsButtonHandleOnMouseUp = useCallback((event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsMouseOn(false);
    setKeys('');
  }, []);

  if (isModalOpen) {
    return (
      <div role="none" className="settings-container">
        <div className="settings-modal">
          <div className="settings-modal-header-row">
            <div className="settings-modal-header">
              <h2 className="settings-modal-title">App Settings</h2>
            </div>
            <div className="settings-modal-header-close">
              <span
                role="button"
                className="settings-modal-header-close-button"
                onKeyDown={closeButtonHandleOnKeyDown}
                onMouseDown={closeButtonHandleOnMouseDown}
                tabIndex={0}
              >
                X
              </span>
            </div>
          </div>
          <form autoComplete="off" onSubmit={formHandleSubmit}>
            {fields.map(({ label, name }) => {
              return (
                <div key={name} className="settings-form-field">
                  <label htmlFor={name}>
                    <div className="settings-form-field-row">
                      <div className="settings-form-field-label">{label}:</div>
                      <div className="settings-form-field-input">
                        <input
                          className="settings-form-field-input-box"
                          type="text"
                          id={name}
                          name={name}
                          value={formData[name]}
                          onChange={formInputHandleChange}
                        />
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
            <div className="settings-form-button-row">
              <div>
                <input className="settings-form-button" type="submit" value="Save" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      className="settings-button"
      onKeyDown={settingsButtonHandleOnKeyDown}
      onMouseDown={settingsButtonHandleOnMouseDown}
      onMouseUp={settingsButtonHandleOnMouseUp}
      tabIndex={0}
    />
  );
};

export default memo(AppSettings);
