import { memo } from 'react';
import { Link, useLoaderData, useOutletContext, useRouteLoaderData } from 'react-router-dom';

type Props = {};

const Settings = (_props: Props) => {
  const context = useOutletContext();
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('GameportalPokerSettings', { context, gameportalData, gameportalPokerData, data });

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

export default memo(Settings);
