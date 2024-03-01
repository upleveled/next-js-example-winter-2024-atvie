import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNote } from '../../../database/notes';

const noteSchema = z.object({
  title: z.string().min(3).max(100),
  textContent: z.string().min(3),
});

export type CreateNoteResponseBodyPost =
  | {
      note: { textContent: string };
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateNoteResponseBodyPost>> {
  // Task: Create a note for the current logged in user
  // 1. Get the note data from the request
  // 2. Validate notes data with zod
  // 3. Get the token from the cookie
  // 4. Create the note
  // 5. If the note creation fails, return an error
  // 6. Return the text content of the note

  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = noteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain note object',
        // errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. Create the note
  // This looks insecure but it isn't
  const newNote =
    sessionTokenCookie &&
    (await createNote(
      sessionTokenCookie.value,
      result.data.title,
      result.data.textContent,
    ));

  // 5. If the note creation fails, return an error
  if (!newNote) {
    return NextResponse.json(
      {
        error: 'Note not created or access denied creating note',
      },
      { status: 500 },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    note: { textContent: newNote.textContent },
  });
}
