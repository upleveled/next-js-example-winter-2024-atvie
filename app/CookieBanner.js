'use client';

import { useEffect, useState } from 'react';
import { parseJson } from '../util/json';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import styles from './CookieBanner.module.scss';

export default function CookieBanner() {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

  useEffect(() => {
    const localStorageValue = getLocalStorage('cookiePolicy');
    if (localStorageValue) {
      setAreCookiesAccepted(parseJson(localStorageValue));
    } else {
      setAreCookiesAccepted(false);
    }
  }, []);

  return (
    <div
      className={`${styles.cookieBanner} ${
        areCookiesAccepted ? styles.closed : styles.open
      }`}
    >
      <div>Do you accept the use of cookies?</div>
      <button
        className={styles.button}
        onClick={() => {
          setLocalStorage('cookiePolicy', JSON.stringify(true));
          setAreCookiesAccepted(true);
        }}
      >
        Accept
      </button>
    </div>
  );
}
