import sjson from 'secure-json-parse';
import { FruitComment } from '../app/fruits/[fruitId]/actions';

export function parseJson(stringifiedJson: string) {
  if (!stringifiedJson) return undefined;
  try {
    return sjson(stringifiedJson) as FruitComment[];
  } catch {
    return undefined;
  }
}
