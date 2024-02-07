import { AnimalsFoods } from '../migrations/00004-createTableAnimalFoods';

export function reduceAnimalsWithFoods(animalsWithFoods: AnimalsFoods[]) {
  const animal = animalsWithFoods[0]!;

  const animalWithFoods = {
    id: animal.animalId,
    firstName: animal.animalFirstName,
    type: animal.animalType,
    accessory: animal.animalAccessory,
    animalFoods: animalsWithFoods.map((animalWithFood) => {
      return {
        id: animalWithFood.animalFoodId,
        name: animalWithFood.animalFoodName,
        type: animalWithFood.animalFoodType,
      };
    }),
  };
  return animalWithFoods;
}
