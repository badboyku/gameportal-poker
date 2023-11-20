import {Link, useLoaderData, useRouteLoaderData} from 'react-router-dom';
import {HelloWorld} from '../../components';
import {getEnvVars} from '../../utils/env';
import logoUrl, {ReactComponent as Logo} from './logo.svg';
import './style.scss';
import './styles.css';

type Props = {};

const Home = (_props: Props) => {
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('gameportalPoker Home', { gameportalData, gameportalPokerData, data });

  const { REACT_APP_MY_VAR } = getEnvVars();

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
        REACT_APP_MY_ENVVAR: <span style={{ fontWeight: 'bold' }}>{REACT_APP_MY_VAR}</span>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="settings/">settings</Link>
      </div>
    </div>
  );
};

export default Home;
