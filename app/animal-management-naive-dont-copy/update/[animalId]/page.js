import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

export default async function NaiveUpdateAnimalPage(props) {
  const animal = await updateAnimalInsecure({
    id: Number(props.params.animalId),
    firstName: props.searchParams.firstName,
    type: props.searchParams.type,
    accessory: props.searchParams.accessory,
    birthDate: new Date(props.searchParams.birthDate),
  });

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}
