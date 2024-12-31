import { COLUMN_WIDTH, GUTTER_SIZE } from '../src/constants';
import { 
  moduleW2LocalWidth, 
  moduleX2LocalX, 
  moduleY2LocalY, 
  localX2ModuleX, 
  localY2ModuleY,
} from '../src/helpers/commonHelpers';

describe('commonHelpers', () => {
  test('moduleW2LocalWidth', () => {
    expect(moduleW2LocalWidth(2)).toBe(2 * COLUMN_WIDTH - GUTTER_SIZE);
  });

  test('moduleX2LocalX', () => {
    expect(moduleX2LocalX(2)).toBe(2 * COLUMN_WIDTH + GUTTER_SIZE);
  });

  test('moduleY2LocalY', () => {
    expect(moduleY2LocalY(5)).toBe(5 + GUTTER_SIZE);
  });

  test('localX2ModuleX', () => {
    expect(localX2ModuleX(2 * COLUMN_WIDTH + GUTTER_SIZE)).toBe(2);
  });

  test('localY2ModuleY', () => {
    expect(localY2ModuleY(15)).toBe(15 - GUTTER_SIZE);
  });
});
