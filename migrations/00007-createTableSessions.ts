import { Sql } from 'postgres';

export type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY key generated always AS identity,
      token varchar(150) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT now() + interval '24 hours',
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE sessions`;
}
