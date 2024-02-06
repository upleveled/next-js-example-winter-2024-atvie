import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export async function generateMetadata(props) {
  const singleAnimal = await getAnimalInsecure(props.params.animalId);
  return {
    title: singleAnimal?.firstName,
  };
}

export default async function AnimalPage(props) {
  const singleAnimal = await getAnimalInsecure(props.params.animalId);

  if (!singleAnimal) {
    notFound();
  }

  const currentDate = new Date();

  const daysUntilNextBirthDay = getDaysUntilNextBirthday(
    currentDate,
    singleAnimal.birthDate,
  );

  return (
    <div>
      Single animal page
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth Date: {formatDate(singleAnimal.birthDate)}</div>
      <div>Days left until birthday: {daysUntilNextBirthDay}</div>
      <Image
        src={`/images/${singleAnimal.firstName.toLowerCase()}.png`}
        alt={singleAnimal.firstName}
        width={200}
        height={200}
      />
      this is a {singleAnimal.type} carrying {singleAnimal.accessory}
    </div>
  );
}
