import 'server-only';

const animals = [
  {
    id: 1,
    firstName: 'Lucia',
    type: 'Lion',
    accessory: 'Car',
    birthDate: new Date('2020-10-23'),
  },
  {
    id: 2,
    firstName: 'Macca',
    type: 'Dog',
    accessory: 'Comb',
    birthDate: new Date('2020-10-20'),
  },
  {
    id: 3,
    firstName: 'Jojo',
    type: 'Dodo',
    accessory: 'Dojo',
    birthDate: new Date('2020-04-10'),
  },
  {
    id: 4,
    firstName: 'Flo',
    type: 'Parrot',
    accessory: 'carrot',
    birthDate: new Date('2020-06-12'),
  },
  {
    id: 5,
    firstName: 'Bili',
    type: 'Capybara',
    accessory: 'Pen',
    birthDate: new Date('2020-10-16'),
  },
];

export function getAnimals() {
  return animals;
}

export function getAnimal(id) {
  return animals.find((animal) => animal.id === id);
}
