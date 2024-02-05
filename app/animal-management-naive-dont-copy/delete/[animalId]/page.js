import { notFound } from 'next/navigation';
import { deleteAnimalInsecure } from '../../../../database/animals';

export default async function NaiveUpdateAnimalPage(props) {
  const animal = await deleteAnimalInsecure(Number(props.params.animalId));

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} and first name {animal.firstName} Deleted
    </div>
  );
}
