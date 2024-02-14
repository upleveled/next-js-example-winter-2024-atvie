import { Sql } from 'postgres';
import { z } from 'zod';

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
  birthDate: Date;
};

export const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
  // accessory: z.string().nullable(),
  birthDate: z.coerce.date(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY key generated always AS identity,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(30),
      birth_date date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE animals `;
}
