'use client';

import { useState } from 'react';
import { createOrUpdateCookie } from './actions';

type Props = {
  fruitId: number;
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState('');

  // const [comment, setComment] = useState<string>(); const
  // [comment, setComment] = useState<undefined |
  // string>(undefined);

  // If you want to extract your event handler function, this is
  // the way: function handleChange(event:
  //   ChangeEvent<HTMLTextAreaElement>) {
  // setComment(event.currentTarget.value); }

  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
        // onChange={handleChange}
      />
      <button
        formAction={async () => {
          await createOrUpdateCookie(props.fruitId, comment);
        }}
      >
        Add comment
      </button>
    </form>
  );
}
