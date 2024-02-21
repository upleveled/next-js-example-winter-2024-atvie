import { cache } from 'react';
import { Animal } from '../migrations/00000-createTableAnimals';
import {
  AnimalsFoods,
  AnimalWithFoods,
} from '../migrations/00004-createTableAnimalFoods';
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

export const getAnimalsInsecure = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animalss
    ORDER BY
      id
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

export const getAnimalsWithFoodsInsecure = cache(async (id: number) => {
  // Postgres always returns an array
  const animalsWithFoods = await sql<AnimalsFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.id AS animal_food_id,
      foods.name AS animal_food_name,
      foods.type AS animal_food_type
    FROM
      animals
      LEFT JOIN animal_foods ON animals.id = animal_foods.animal_id
      LEFT JOIN foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
  `;

  return animalsWithFoods;
});

export const getAnimalWithFoodsInsecure = cache(async (id: number) => {
  const [animal] = await sql<AnimalWithFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      -- Return empty array instead of [null] if no food is found
      coalesce(
        json_agg(foods.*) FILTER (
          WHERE
            foods.id IS NOT NULL
        ),
        '[]'
      ) AS animal_foods
    FROM
      animals
      LEFT JOIN animal_foods ON animals.id = animal_foods.animal_id
      LEFT JOIN foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
    GROUP BY
      animals.first_name,
      animals.type,
      animals.accessory,
      animals.id
  `;

  return animal;
});

export const createAnimalInsecure = cache(
  // Accept an object as an argument, allowing optional properties like
  // `accessory` before required properties like `birthDate`
  //
  // `Omit` is a TS utility type that excludes a property from a type
  async (newAnimal: Omit<Animal, 'id'>) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${newAnimal.firstName},
          ${newAnimal.type},
          ${newAnimal.accessory},
          ${newAnimal.birthDate}
        )
      RETURNING
        animals.*
    `;

    return animal;
  },
);

export const updateAnimalInsecure = cache(async (updatedAnimal: Animal) => {
  const [animal] = await sql<Animal[]>`
    UPDATE animals
    SET
      first_name = ${updatedAnimal.firstName},
      type = ${updatedAnimal.type},
      accessory = ${updatedAnimal.accessory},
      birth_date = ${updatedAnimal.birthDate}
    WHERE
      id = ${updatedAnimal.id}
    RETURNING
      animals.*
  `;

  return animal;
});

export const deleteAnimalInsecure = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    DELETE FROM animals
    WHERE
      id = ${id}
    RETURNING
      animals.*
  `;

  return animal;
});
