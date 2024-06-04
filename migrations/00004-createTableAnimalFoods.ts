import { Sql } from 'postgres';

export type AnimalsFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoodId: number | null;
  animalFoodName: string | null;
  animalFoodType: string | null;
};

export type AnimalWithFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoods: {
    id: number | null;
    name: string | null;
    type: string | null;
  }[];
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animal_foods (
      id integer PRIMARY key generated always AS identity,
      animal_id integer NOT NULL REFERENCES animals (id) ON DELETE cascade,
      food_id integer NOT NULL REFERENCES foods (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE animal_foods `;
}
