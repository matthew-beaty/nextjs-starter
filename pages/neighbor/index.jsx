import React from 'react';
import Layout from '../../components/Layout';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect } from 'react';

const stephensLoc = { lat: 39.6781676, lng: -104.9134844 };

const render = (status) => {
  return <h1>{status}</h1>;
};

function Map({ center, zoom }) {
  const mapRef = React.useRef();

  useEffect(() => {
    new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
  });

  return <div ref={mapRef} id="map"></div>;
}

export default function Index({ googleMapKey }) {
  return (
    <Layout>
      <h3 className="text-4xl">hello neighbor</h3>
      <div className="h-96 w-96">
        <Wrapper apiKey={googleMapKey} render={render}>
          <Map
            center={stephensLoc}
            zoom={2}
            style={{ flexGrow: '1', height: '100%' }}
          ></Map>
        </Wrapper>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { googleMapKey: process.env.GOOGLE_MAPS_API_KEY } };
}
