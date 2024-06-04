import { cache } from 'react';
import { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

export const getNotes = cache(async (sessionToken: string) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND notes.user_id = sessions.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getNote = cache(async (sessionToken: string, noteId: number) => {
  const [note] = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND notes.user_id = sessions.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      notes.id = ${noteId}
  `;
  return note;
});

export const createNote = cache(
  async (sessionToken: string, title: string, textContent: string) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (user_id, title, text_content) (
          SELECT
            user_id,
            ${title},
            ${textContent}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        notes.*
    `;

    return note;
  },
);
