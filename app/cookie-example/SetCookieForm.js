'use client';

import { useState } from 'react';
import { createCookie } from './actions';

export default function SetCookieForm() {
  const [cookieValue, setCookieValue] = useState('');

  return (
    <form>
      <input
        value={cookieValue}
        onChange={(event) => setCookieValue(event.currentTarget.value)}
      />
      <button
        // instead of onClick use formAction to handle the form submission
        formAction={async () => await createCookie(cookieValue)}
      >
        Set Cookie
      </button>
    </form>
  );
}
