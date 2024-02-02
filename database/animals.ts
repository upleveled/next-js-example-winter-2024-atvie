import { cache } from 'react';
import { sql } from './connect';

// This data is now coming from the database
// const animals = [
//   {
//     id: 1,
//     firstName: 'Lucia',
//     type: 'Lion',
//     accessory: 'Car',
//     birthDate: new Date('2020-10-23'),
//   },
//   {
//     id: 2,
//     firstName: 'Macca',
//     type: 'Dog',
//     accessory: 'Comb',
//     birthDate: new Date('2020-10-20'),
//   },
//   {
//     id: 3,
//     firstName: 'Jojo',
//     type: 'Dodo',
//     accessory: 'Dojo',
//     birthDate: new Date('2020-04-10'),
//   },
//   {
//     id: 4,
//     firstName: 'Flo',
//     type: 'Parrot',
//     accessory: 'carrot',
//     birthDate: new Date('2020-06-12'),
//   },
//   {
//     id: 5,
//     firstName: 'Bili',
//     type: 'Capybara',
//     accessory: 'Pen',
//     birthDate: new Date('2020-10-16'),
//   },
// ];

type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
  birthDate: Date;
};

export const getAnimalsInsecure = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
  `;

  return animals;
});

export const getAnimalInsecure = cache(async (id: number) => {
  // Postgres always returns an array
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;

  return animal;
});
