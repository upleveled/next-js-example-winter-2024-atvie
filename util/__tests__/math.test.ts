import { expect, test } from '@jest/globals';
import { add } from '../math';

test('add 2 numbers', () => {
  expect(add(1, 1)).toBe(2);
  expect(add(100, 100)).toBe(200);
});

test('throws an error when arguments are not numbers', () => {
  // @ts-expect-error testing incorrect arguments
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  // @ts-expect-error testing incorrect arguments
  expect(() => add('asd', '1')).toThrow('Pass only numbers!');
  // @ts-expect-error testing incorrect arguments
  expect(() => add(1, false)).toThrow('Pass only numbers!');
});
