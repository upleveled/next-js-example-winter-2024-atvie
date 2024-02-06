import { expect, test } from '@jest/globals';
import { formatDate, getDaysUntilNextBirthday } from '../dates';

test('format date for displaying the date with different locale date formats', () => {
  expect(formatDate(new Date('2023-10-20'))).toBe('20/10/2023');

  expect(formatDate(new Date('2023-10-20'), 'en-US')).toBe('10/20/2023');

  expect(formatDate(new Date('2023-10-20'), 'en-GB')).toBe('20/10/2023');

  // Date for 29/02 without leap year
  expect(formatDate(new Date('2023-02-29'), 'en-GB')).toBe('01/03/2023');

  // Date for 29/02 with leap year
  expect(formatDate(new Date('2024-02-29'), 'en-GB')).toBe('29/02/2024');

  // Create a new Date object from individual values
  // Months are 0 based, because they are represented as an index in an array
  expect(formatDate(new Date(2023, 9, 22), 'en-US')).toBe('10/22/2023');
});

test('format date for displaying the date with different options', () => {
  expect(
    formatDate(new Date('2023-10-20'), 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  ).toBe('October 20, 2023');

  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  ).toBe('20. Oktober 2023');

  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  ).toBe('20. Okt. 2023');

  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
  ).toBe('20.10.23');
});

test('throws an error when dates are not valid', () => {
  expect(() => formatDate(new Date())).not.toThrow('Pass only dates!');
  // @ts-expect-error testing incorrect arguments
  expect(() => formatDate(false)).toThrow('Pass only dates!');
  // @ts-expect-error testing incorrect arguments
  expect(() => formatDate('Lucia')).toThrow('Pass only dates!');
  // @ts-expect-error testing incorrect arguments
  expect(() => formatDate('25-03-2023')).toThrow('Pass only dates!');
});

test('calculate days until next birthday', () => {
  expect(
    getDaysUntilNextBirthday(new Date('2023-10-18'), new Date('2021-10-19')),
  ).toBe(1);

  expect(
    getDaysUntilNextBirthday(new Date('2023-10-18'), new Date('1990-10-18')),
  ).toBe(0);

  expect(
    getDaysUntilNextBirthday(new Date('2023-10-18'), new Date('2005-11-25')),
  ).toBe(38);

  expect(
    getDaysUntilNextBirthday(new Date('2023-10-18'), new Date('2020-01-01')),
  ).toBe(75);

  // Leap year 2024
  expect(
    getDaysUntilNextBirthday(new Date('2024-02-28'), new Date('2004-02-29')),
  ).toBe(1);

  // Pass timestamp values to the function
  expect(
    getDaysUntilNextBirthday(new Date(1697673600000), new Date(1697673600000)),
  ).toBe(0);

  // Pass individual values to the function
  expect(
    getDaysUntilNextBirthday(new Date(2023, 9, 24), new Date(1998, 6, 25)),
  ).toBe(275);
});

test('throws an error when arguments are not dates', () => {
  // @ts-expect-error testing incorrect arguments
  expect(() => getDaysUntilNextBirthday('123', new Date('2023-01-01'))).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => getDaysUntilNextBirthday(new Date('2023-01-01'), NaN)).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => getDaysUntilNextBirthday(12 - 24 - 2023, true)).toThrow(
    'Pass only dates!',
  );
});

test('throws an error when birth date is after current date', () => {
  expect(() =>
    getDaysUntilNextBirthday(new Date('2024-02-07'), new Date('2024-12-24')),
  ).toThrow('Birth date must be before current date!');

  expect(() =>
    getDaysUntilNextBirthday(new Date('2024-02-07'), new Date('2030-01-01')),
  ).toThrow('Birth date must be before current date!');
});
