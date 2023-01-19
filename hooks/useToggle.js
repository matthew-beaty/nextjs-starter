import { useState } from 'react';

export default function useToggle(defaultsOn = true) {
  const [on, setOn] = useState(defaultsOn);
  function toggle() {
    setOn((on) => !on);
  }
  return [on, toggle];
}
