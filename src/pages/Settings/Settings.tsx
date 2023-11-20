import {Link, useLoaderData, useRouteLoaderData} from 'react-router-dom';

type Props = {};

const Settings = (_props: Props) => {
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('gameportalPoker Settings', { gameportalData, gameportalPokerData, data });

  return (
    <div>
      <h1>Settings</h1>
      <div>settings form here!!!</div>
      <div style={{ marginTop: 20 }}>
        <Link to="/poker">back</Link>
      </div>
    </div>
  );
};

export default Settings;
