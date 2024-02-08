'use server';
import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

// Case A: cookie is undefined (not set)
// Case B: cookie set, id doesn't exist yet
// Case C: cookie set, id exists already

export type FruitComment = {
  id: number;
  comment: string;
};

export async function createOrUpdateCookie(fruitId: number, comment: string) {
  // 1. get current cookie
  const fruitsCommentsCookie = getCookie('fruitComments');

  // 2. parse the cookie value
  const fruitComments = !fruitsCommentsCookie
    ? // Case A: cookie is undefined
      []
    : parseJson(fruitsCommentsCookie) || [];

  // 3. edit the cookie value
  const fruitToUpdate = fruitComments.find((fruitComment: FruitComment) => {
    return fruitComment.id === fruitId;
  });

  // Case B: cookie set, id doesn't exist yet
  if (!fruitToUpdate) {
    fruitComments.push({ id: fruitId, comment: comment });
  } else {
    // Case C: cookie set, id exists already
    fruitToUpdate.comment = comment;
  }

  // 4. we override the cookie
  await cookies().set('fruitComments', JSON.stringify(fruitComments));
}
