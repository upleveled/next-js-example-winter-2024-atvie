import { Sql } from 'postgres';
import { Food } from './00002-createTableFoods';

export type AnimalsFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoodId: number | null;
  animalFoodName: string | null;
  animalFoodType: string | null;
};

export type JsonAgg = Food[];

export type AnimalWithFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoods: JsonAgg;
};

export type Test = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoods: JsonAgg;
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
