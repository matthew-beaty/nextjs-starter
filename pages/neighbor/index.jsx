import React from 'react';
import Layout from '../../components/Layout';
import { Wrapper } from '@googlemaps/react-wrapper';
import Status from '../../components/Neighbor/Status';
import Marker from '../../components/Neighbor/Marker';
import Map from '../../components/Neighbor/Map';
import Name from '../../components/Neighbor/Name';
import { mattsLoc } from '../../components/Neighbor/consts';

export default function Index({ googleMapKey }) {
  const [markers, setMarkers] = React.useState([]);
  const [activeMarker, setActiveMarker] = React.useState(null);

  React.useEffect(() => {
    if (window) {
      const prevMarkers = localStorage.getItem('markers');
      setMarkers(JSON.parse(prevMarkers) || []);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);

  function onClick(e) {
    setMarkers([...markers, { latLng: e.latLng, name: '' }]);
  }

  function onChange(e, index) {
    const name = e.target.value;
    setMarkers(markers.map((m, i) => (i === index ? { ...m, name } : m)));
  }

  function removeMarker(index) {
    setMarkers(markers.filter((m, i) => i !== index));
  }

  function clearAll() {
    setMarkers([]);
    localStorage.removeItem('markers');
  }

  return (
    <Layout>
      <h3 className="text-4xl mb-10">hello neighbor</h3>
      <div className="flex w-100 gap-3">
        <div className="h-96 w-96 flex">
          <Wrapper apiKey={googleMapKey} render={Status}>
            <Map center={mattsLoc} zoom={17} onClick={onClick}>
              {markers.map(({ latLng, name }, i) => (
                <Marker
                  key={i}
                  position={latLng}
                  label={name}
                  animation={
                    i === activeMarker ? google.maps.Animation.BOUNCE : null
                  }
                />
              ))}
            </Map>
          </Wrapper>
        </div>
        <div>
          {markers.length === 0 && <p>Click the map to add a new Neighbor</p>}
          {markers.map(({ latLng, name }, i) => (
            <div className="flex gap-1" key={i}>
              <Name
                onChange={onChange}
                onFocus={() => setActiveMarker(i)}
                onBlur={setActiveMarker}
                latLng={latLng}
                name={name}
                id={i}
              />
              <button onClick={() => removeMarker(i)}>X</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={clearAll}>Clear all</button>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { googleMapKey: process.env.GOOGLE_MAPS_API_KEY } };
}
