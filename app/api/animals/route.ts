import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createAnimal, getAnimalsInsecure } from '../../../database/animals';
import { getValidSession } from '../../../database/sessions';
import {
  Animal,
  animalSchema,
} from '../../../migrations/00000-createTableAnimals';
import { validateTokenAgainstSecret } from '../../../util/csrf';

type AnimalsResponseBodyGet = {
  animals: Animal[];
};

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export async function GET(): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({
    animals: animals,
  });
}

type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  const requestBody = await request.json();

  const result = animalSchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    // error.issues [
    //   {
    //     code: 'invalid_type',
    //     expected: 'string',
    //     received: 'undefined',
    //     path: [ 'name' ],
    //     message: 'Required'
    //   }
    // ]
    console.log('error.issues', result.error.issues);

    return NextResponse.json(
      {
        error: 'Request does not contain animal object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // Try this first:
  // await createAnimalInsecure(result.data);

  // const newAnimal = await createAnimalInsecure({
  //   firstName: result.data.firstName,
  //   type: result.data.type,
  //   accessory: result.data.accessory || null,
  //   birthDate: result.data.birthDate,
  // });

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        error: 'not a valid session',
      },
      { status: 401 },
    );
  }

  // validate a csrf token against a secret/seed in the sessions table
  if (!validateTokenAgainstSecret(session.csrfSecret, result.data.csrfToken)) {
    return NextResponse.json(
      {
        error: 'not a valid csrf token',
      },
      { status: 401 },
    );
  }

  const newAnimal = await createAnimal(sessionTokenCookie.value, {
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not created or access denied creating animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: newAnimal,
  });
}
