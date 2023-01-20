import React from 'react';

export default function Map({ center, zoom, onClick, children }) {
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
