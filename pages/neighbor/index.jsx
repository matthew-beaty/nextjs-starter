import React from 'react';
import Layout from '../../components/Layout';
import { Wrapper } from '@googlemaps/react-wrapper';

const stephensLoc = { lat: 39.6781676, lng: -104.9134844 };
const mattsLoc = { lat: 39.90978123117473, lng: -85.13967024434808 };

const render = (status) => {
  return <h1>{status}</h1>;
};

function Map({ center, zoom, onClick, children }) {
  const mapRef = React.useRef();
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    setMap(
      new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      })
    );
  }, [mapRef]);

  React.useEffect(() => {
    if (map && onClick) {
      console.log('ya');
      map.addListener('click', onClick);
    }
  }, [onClick, map]);

  return (
    <div ref={mapRef} id="map" style={{ flexGrow: '1', height: '100%' }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
}

function Marker(options) {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) setMarker(new google.maps.Marker());

    return () => {
      if (marker) marker.setMap(null);
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) marker.setOptions(options);
  }, [marker, options]);

  return null;
}

const Name = ({ latLng }) => {
  const [names, setName] = React.useState('');

  return (
    <div>
      <p>{JSON.stringify(latLng.toJSON(), null, 2)}</p>
      <input
        className=" text-blue-800"
        name="names"
        onChange={(e) => setName(e.target.value)}
        value={names}
      />
    </div>
  );
};

export default function Index({ googleMapKey }) {
  const [markers, setMarkers] = React.useState([]);

  function onClick(e) {
    console.log(e.latLng);
    setMarkers([...markers, e.latLng]);
  }

  return (
    <Layout>
      <h3 className="text-4xl">hello neighbor</h3>
      <div className="h-96 w-96 flex">
        <Wrapper apiKey={googleMapKey} render={render}>
          <Map center={mattsLoc} zoom={17} onClick={onClick}>
            {markers.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
          </Map>
        </Wrapper>
      </div>
      <div>
        {markers.map((latLng, i) => (
          <Name key={i} latLng={latLng} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { googleMapKey: process.env.GOOGLE_MAPS_API_KEY } };
}
