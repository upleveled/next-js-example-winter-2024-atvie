'use client';

import { useEffect, useState } from 'react';

export default function LocalStorage() {
  const [darkMode, setDarkMode] = useState('');

  useEffect(() => {
    // Set Value to local storage
    // window.localStorage.setItem('darkMode', true);

    // Remove value from local storage
    // window.localStorage.removeItem('darkMode');

    // get value from local storage
    setDarkMode(window.localStorage.getItem('darkMode'));
  }, []);
  return <div>{darkMode ? darkMode : 'false'}</div>;
}
