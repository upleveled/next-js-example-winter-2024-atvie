import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalsWithFoodsInsecure,
  getAnimalWithFoodsInsecure,
} from '../../../../database/animals';
import { reduceAnimalsWithFoods } from '../../../../util/dataStructures';

export default async function AnimalFoodPage(props) {
  const animalsWithFoods = await getAnimalsWithFoodsInsecure(
    props.params.animalId,
  );

  const animalWithFoodJsonAgg = await getAnimalWithFoodsInsecure(
    props.params.animalId,
  );

  if (!animalsWithFoods[0]) notFound();

  const animalWithFoods = reduceAnimalsWithFoods(animalsWithFoods);

  return (
    <div>
      <h1>
        {animalWithFoods.firstName} (using data transformation in JavaScript)
      </h1>
      <Image
        src={`/images/${animalWithFoods.firstName.toLowerCase()}.png`}
        alt={`A picture of ${animalWithFoods.firstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoods.type} carrying a {animalWithFoods.accessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoods.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-foods-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <br />
      <h1>
        {animalWithFoodJsonAgg.animalFirstName} (using data transformation in
        SQL using json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFoodJsonAgg.animalFirstName.toLowerCase()}.png`}
        alt={`A picture of ${animalWithFoodJsonAgg.animalFirstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoodJsonAgg.animalType} carrying a{' '}
        {animalWithFoodJsonAgg.animalAccessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoodJsonAgg.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-food-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
