-- This file is only my notes, changing this file doesn't change
-- anything in the database

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(30),
  birth_date date NOT NULL
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
 (first_name, type, accessory, birth_date)
VALUES
  ( 'Lucia', 'Lion', 'Car', '2020-10-23'),
  ('Macca', 'Dog', 'Comb', '2020-10-20'),
  ('Jojo', 'Dodo', 'Dojo', '2020-04-10'),
  ('Flo', 'Parrot', 'Carrot', '2020-06-12'),
  ('Bili', 'Capybara', 'Pen', '2020-10-16');

-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;


CREATE DATABASE winter_migration_2024;
CREATE USER winter_migration_2024 WITH ENCRYPTED PASSWORD 'winter_migration_2024';
GRANT ALL PRIVILEGES ON DATABASE winter_migration_2024 TO winter_migration_2024;
-- psql: \connect winter_migration_2024;
CREATE SCHEMA winter_migration_2024 AUTHORIZATION winter_migration_2024;
