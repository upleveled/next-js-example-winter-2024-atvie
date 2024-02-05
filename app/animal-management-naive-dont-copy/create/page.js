import { notFound } from 'next/navigation';
import { createAnimalInsecure } from '../../../database/animals';

export default async function NaiveCreateAnimalPage(props) {
  const animal = await createAnimalInsecure({
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
      <h1>{animal.firstName}</h1>
      <p>has been created with the following information</p>
      <p>Type: {animal.type}</p>
      <p>Accessory: {animal.accessory}</p>
      <p>
        Birth date:{' '}
        {animal.birthDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </p>
    </div>
  );
}
