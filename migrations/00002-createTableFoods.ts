import { Sql } from 'postgres';

export type Food = {
  id: number;
  name: string;
  type: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE foods (
      id integer PRIMARY key generated always AS identity,
      name varchar(30) NOT NULL,
      type varchar(30) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE foods `;
}
