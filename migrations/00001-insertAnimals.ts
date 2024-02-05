import { Sql } from 'postgres';

const animals = [
  {
    id: 1,
    firstName: 'Lucia',
    type: 'Lion',
    accessory: 'Car',
    birthDate: new Date('2020-10-23'),
  },
  {
    id: 2,
    firstName: 'Macca',
    type: 'Dog',
    accessory: 'Comb',
    birthDate: new Date('2020-10-20'),
  },
  {
    id: 3,
    firstName: 'Jojo',
    type: 'Dodo',
    accessory: 'Dojo',
    birthDate: new Date('2020-04-10'),
  },
  {
    id: 4,
    firstName: 'Flo',
    type: 'Parrot',
    accessory: 'carrot',
    birthDate: new Date('2020-06-12'),
  },
  {
    id: 5,
    firstName: 'Bili',
    type: 'Capybara',
    accessory: 'Pen',
    birthDate: new Date('2020-10-16'),
  },
];

export async function up(sql: Sql) {
  for (const animal of animals) {
    await sql`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${animal.firstName},
          ${animal.type},
          ${animal.accessory},
          ${animal.birthDate}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const animal of animals) {
    await sql`
      DELETE FROM animals
      WHERE
        id = ${animal.id}
    `;
  }
}
