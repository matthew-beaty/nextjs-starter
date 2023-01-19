import React from 'react';
import to from '../utils/to';

export default function Summary({ title, totals, inMetric }) {
  // if (!totals) return <div>Loading Strava data...</div>;
  // const { count, distance, movingTime } = totals;
  const { count, distance, movingTime } = {
    count: 20,
    distance: 100,
    movingTime: 1000,
  };

  return (
    <div className="w-80">
      <h2 className="self-center">{title}</h2>
      <ul className="flex justify-around p-2 rounded-3xl">
        <li className="p-1">{count} runs</li>
        <li className="p-1">
          {inMetric ? `${to.km(distance)} km` : `${to.m(distance)} m`}
        </li>
        <li className="p-1">{to.h(movingTime)} hours</li>
      </ul>
    </div>
  );
}
