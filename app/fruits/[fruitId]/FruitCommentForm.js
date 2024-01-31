'use client';

import { useState } from 'react';
import { createOrUpdateCookie } from './actions';

export default function FruitCommentForm(props) {
  const [comment, setComment] = useState('');
  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
      <button
        formAction={async () =>
          await createOrUpdateCookie(props.fruitId, comment)
        }
      >
        Add comment
      </button>
    </form>
  );
}
