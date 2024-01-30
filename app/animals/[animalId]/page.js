import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimal } from '../../../database/animals';

export function generateMetadata(props) {
  const singleAnimal = getAnimal(Number(props.params.animalId));
  return {
    title: singleAnimal?.firstName,
  };
}

export default function AnimalPage(props) {
  const singleAnimal = getAnimal(Number(props.params.animalId));

  if (!singleAnimal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(singleAnimal.birthDate);

  // Set birth date year to current year
  nextBirthDate.setUTCFullYear(currentDate.getFullYear());

  // Set UTC time to 0 to compare only days (avoid time zones)
  currentDate.setUTCHours(0, 0, 0, 0);
  nextBirthDate.setUTCHours(0, 0, 0, 0);

  if (nextBirthDate.getTime() < currentDate.getTime()) {
    nextBirthDate.setUTCFullYear(currentDate.getFullYear() + 1);
  }

  const daysUntilNextBirthDay =
    (nextBirthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

  return (
    <div>
      Single animal page
      <h1>{singleAnimal.firstName}</h1>
      <div>
        Birth Date:{' '}
        {singleAnimal.birthDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
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
