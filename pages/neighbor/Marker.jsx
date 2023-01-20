import React from 'react';

export default function Marker(options) {
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
