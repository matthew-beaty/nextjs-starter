import React from 'react';

export default function Name({ name, onChange, id, onFocus, onBlur }) {
  return (
    <div>
      <p></p>
      <input
        className=" text-blue-800"
        name="names"
        placeholder="neighborly name"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => onChange(e, id)}
        value={name}
      />
    </div>
  );
}
