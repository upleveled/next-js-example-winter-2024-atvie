import { NextResponse } from 'next/server';
import {
  deleteAnimalInsecure,
  getAnimalInsecure,
  updateAnimalInsecure,
} from '../../../../database/animals';
import {
  Animal,
  animalSchema,
} from '../../../../migrations/00000-createTableAnimals';

type AnimalParams = {
  params: {
    animalId: string;
  };
};

type AnimalResponseBodyGet =
  | { error: string }
  | {
      animal: Animal;
    };

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export async function GET(
  request: NextResponse,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animal = await getAnimalInsecure(Number(params.animalId));

  if (!animal) {
    return NextResponse.json(
      {
        error: "Animal doesn't exist",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}

type AnimalResponseBodyPut =
  | { error: string }
  | {
      animal: Animal;
    };

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export async function PUT(
  request: NextResponse,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyPut>> {
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
        error: 'You need to send an animal object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // Try this first:
  // await createAnimalInsecure(result.data);

  const updatedAnimal = await updateAnimalInsecure({
    id: Number(params.animalId),
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

  if (!updatedAnimal) {
    return NextResponse.json(
      {
        error: 'Error updating the new animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: updatedAnimal,
  });
}

type AnimalResponseBodyDelete =
  | { error: string }
  | {
      animal: Animal;
    };

// WARNING: You probably don't need this, because you can just do
// a database query directly in your Server Component
export async function DELETE(
  request: NextResponse,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  const animal = await deleteAnimalInsecure(Number(params.animalId));

  if (!animal) {
    return NextResponse.json(
      {
        error: "Animal doesn't exist",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
