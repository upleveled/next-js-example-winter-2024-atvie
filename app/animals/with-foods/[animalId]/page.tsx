import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalsWithFoodsInsecure,
  getAnimalWithFoodsInsecure,
} from '../../../../database/animals';
import { reduceAnimalsWithFoods } from '../../../../util/dataStructures';

type Props = {
  params: {
    animalId: string;
  };
};

export default async function AnimalFoodPage(props: Props) {
  const animalsWithFoods = await getAnimalsWithFoodsInsecure(
    Number(props.params.animalId),
  );

  const animalWithFoodsArray = await getAnimalWithFoodsInsecure(
    Number(props.params.animalId),
  );

  if (!animalsWithFoods[0]) notFound();
  if (!animalWithFoodsArray) notFound();

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
        {animalWithFoodsArray.animalFirstName} (using data transformation in SQL
        using json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFoodsArray.animalFirstName.toLowerCase()}.png`}
        alt={`A picture of ${animalWithFoodsArray.animalFirstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoodsArray.animalType} carrying a{' '}
        {animalWithFoodsArray.animalAccessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoodsArray.animalFoods.map((animalFood) => {
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
