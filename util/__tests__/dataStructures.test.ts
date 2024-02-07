import { expect, test } from '@jest/globals';
import { reduceAnimalsWithFoods } from '../dataStructures';

test('reduce animal favorite foods', () => {
  const animalWithFood = [
    {
      animalId: 1,
      animalFirstName: 'Lucia',
      animalType: 'Lion',
      animalAccessory: 'Car',
      animalFoodId: 3,
      animalFoodName: 'Rice',
      animalFoodType: 'Grain',
    },
    {
      animalId: 1,
      animalFirstName: 'Lucia',
      animalType: 'Lion',
      animalAccessory: 'Car',
      animalFoodId: 4,
      animalFoodName: 'Mango',
      animalFoodType: 'Fruit',
    },
  ];

  const reducedAnimalWithFoods = {
    id: 1,
    firstName: 'Lucia',
    type: 'Lion',
    accessory: 'Car',
    animalFoods: [
      { id: 3, name: 'Rice', type: 'Grain' },
      { id: 4, name: 'Mango', type: 'Fruit' },
    ],
  };

  expect(reduceAnimalsWithFoods(animalWithFood)).toStrictEqual(
    reducedAnimalWithFoods,
  );
});
