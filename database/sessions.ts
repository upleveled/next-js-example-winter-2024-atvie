import { cache } from 'react';
import { Session } from '../migrations/00009-alterTableSessions';
import { sql } from './connect';

export const getValidSession = cache(async (token: string) => {
  const [session] = await sql<Pick<Session, 'id' | 'token' | 'csrfSecret'>[]>`
    SELECT
      sessions.id,
      sessions.token,
      sessions.csrf_secret
    FROM
      sessions
    WHERE
      sessions.token = ${token}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
});

export const createSessionInsecure = cache(
  async (userId: number, token: string, csrfSecret: string) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (user_id, token, csrf_secret)
      VALUES
        (
          ${userId},
          ${token},
          ${csrfSecret}
        )
      RETURNING
        sessions.id,
        sessions.token,
        sessions.user_id,
        sessions.csrf_secret
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        expiry_timestamp < now()
    `;

    return session;
  },
);

export const deleteSession = cache(async (token: string) => {
  // 'Pick' is a TS utility type that picks specified properties
  // from a type and excluding the rest
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      sessions.id,
      sessions.token
  `;

  return session;
});
