export const fruits = [
  { id: 1, name: 'Apple', icon: '🍎' },
  { id: 2, name: 'Banana', icon: '🍌' },
  { id: 3, name: 'Kiwi', icon: '🥝' },
  { id: 4, name: 'Strawberry', icon: '🍓' },
  { id: 5, name: 'Orange', icon: '🍊' },
  { id: 6, name: 'Melon', icon: '🍉' },
];

export function getFruits() {
  return fruits;
}

export function getFruit(id) {
  return fruits.find((fruit) => fruit.id === id);
}
