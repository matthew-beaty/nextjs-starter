import { useState } from 'react';
import Layout, { GradientBackground } from '../components/Layout';

function toKM(m, toFixed = 2) {
  return (m / 1000).toFixed(toFixed);
}

function toM(m, toFixed = 2) {
  return (m * 0.00062137).toFixed(toFixed);
}

function toHours(s, toFixed = 2) {
  return (s / 60 / 60).toFixed(toFixed);
}

export default function Index({
  count,
  distance,
  movingTime,
  recent_run_totals,
}) {
  console.log(count, distance, movingTime, recent_run_totals);

  const [metric, setMetric] = useState(true);

  return (
    <Layout>
      <button onClick={() => setMetric((metric) => !metric)}>{`use ${
        metric ? 'Imperial' : 'Metric'
      } units`}</button>
      <h1>Matthew Beaty&apos;s Running Data (strava only)</h1>

      <h2>All Time </h2>
      <div>Number of Runs: {count} runs</div>
      <div>
        {`Total Miles:
        ${metric ? toKM(distance) + ' kilometers' : toM(distance) + ' miles'}`}
      </div>
      <div>Total Moving Time: {toHours(movingTime)} hours</div>

      <h2>Last 4 Week Totals </h2>
      <div>Number of Runs: {recent_run_totals.count} runs</div>
      <div>
        {`Total Miles:
        ${
          metric
            ? toKM(recent_run_totals.distance) + ' kilometers'
            : toM(recent_run_totals.distance) + ' miles'
        }`}
      </div>
      <div>
        Total Moving Time: {toHours(recent_run_totals.moving_time)} hours
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const myID = '73196345';
  // hardcode to my own id for now
  const athleteID = myID;

  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_SECRET,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  const reauthResponse = await fetch('https://www.strava.com/oauth/token', {
    method: 'post',
    headers,
    body,
  });

  console.log(reauthResponse);

  const authData = await reauthResponse.json();

  const response = await fetch(
    `https://www.strava.com/api/v3/athletes/${athleteID}/stats?access_token=${authData.access_token}`
  );

  // console.log(response);
  const data = await response.json();
  const { all_run_totals } = data;
  const { recent_run_totals } = data;

  const {
    count,
    distance,
    moving_time: movingTime,
  } = all_run_totals || { count: null, distance: null, moving_time: null };

  return { props: { count, distance, movingTime, recent_run_totals } };
}
