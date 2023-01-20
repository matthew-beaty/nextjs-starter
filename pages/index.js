import { useState } from 'react';
import Layout from '../components/Layout';
import StravaSummary from '../components/StravaSummary';
import useToggle from '../hooks/useToggle';

export default function Index({ allRunTotals, recentRunTotals, error }) {
  const [inMetric, toggleMetric] = useToggle();

  return (
    <Layout>
      <aside className="border border-white rounded-lg p-2">
        <div className="flex justify-center">
          <h1 className="p-4 text-2xl">Running Data (via Strava)</h1>
        </div>
        <StravaSummary
          title="Last 4 Weeks"
          totals={recentRunTotals}
          inMetric={inMetric}
        />
        <StravaSummary
          title="All Time"
          totals={allRunTotals}
          inMetric={inMetric}
        />
        <div className="flex justify-center">
          <button onClick={toggleMetric}>
            {inMetric ? 'use Imperial units' : 'use Metric units'}
          </button>
        </div>
      </aside>
    </Layout>
  );
}

export async function getServerSideProps() {
  const MYSTRAVAID = '73196345';

  // Retrieve auth date since Strava requires getting updated refresh tokens
  // TODO: for now, we fetch the token every time, but we skip this step by
  // saving the token somewhere. (currently serverless, so this would have to be client-side)
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

  try {
    const reauthResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'post',
      headers,
      body,
    });
    const authData = await reauthResponse.json();

    // Fetch summary stats
    const response = await fetch(
      `https://www.strava.com/api/v3/athletes/${MYSTRAVAID}/stats?access_token=${authData.access_token}`
    );
    const { all_run_totals, recent_run_totals } = await response.json();

    return {
      props: {
        // quick rekey for camelcase
        allRunTotals: {
          ...all_run_totals,
          movingTime: all_run_totals.moving_time,
        },
        recentRunTotals: {
          ...recent_run_totals,
          movingTime: recent_run_totals.moving_time,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        allRunTotals: null,
        recentRunTotals: null,
        error: error.message,
      },
    };
  }
}
