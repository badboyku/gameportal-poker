import { memo } from 'react';
import { Link, useLoaderData, useOutletContext, useRouteLoaderData } from 'react-router-dom';
import { HelloWorld } from '../../components';
import { getEnvVars } from '../../utils/env';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';

type Props = {};

const Home = (_props: Props) => {
  const context = useOutletContext();
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('GameportalPokerHome', { context, gameportalData, gameportalPokerData, data });

  const { REACT_APP_POKER_API_URL, REACT_APP_TOKEN } = getEnvVars();

  return (
    <div>
      <h1>Poker</h1>
      <HelloWorld />
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />
      <h3>Env Vars</h3>
      <div>
        IS_DEV: <span style={{ fontWeight: 'bold' }}>{IS_DEV.toString()}</span>
      </div>
      <div>
        IS_PROD: <span style={{ fontWeight: 'bold' }}>{IS_PROD.toString()}</span>
      </div>
      <div>
        REACT_APP_POKER_API_URL: <span style={{ fontWeight: 'bold' }}>{REACT_APP_POKER_API_URL}</span>
      </div>
      <div>
        REACT_APP_TOKEN: <span style={{ fontWeight: 'bold' }}>{REACT_APP_TOKEN}</span>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="settings/">settings</Link>
      </div>
    </div>
  );
};

export default memo(Home);
