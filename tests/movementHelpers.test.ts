import { COLUMN_WIDTH, GUTTER_SIZE } from '../src/constants';
import { handlerModuleDestination, getWidthInPixel, getRanges } from '../src/helpers/movementHelpers';
import { ModuleDestination } from '../src/types/HelperTypes';
import ModuleInterface from '../src/types/ModuleInterface';

describe('movementHelpers', () => {
  test('getWidthInPixel for small width', () => {
    expect(getWidthInPixel(1)).toBe(COLUMN_WIDTH - GUTTER_SIZE);
  });

  test('getWidthInPixel for larger width', () => {
    expect(getWidthInPixel(2)).toBe(COLUMN_WIDTH + (COLUMN_WIDTH - GUTTER_SIZE));
  });

  test('getRanges', () => {
    const modules: ModuleInterface[] = [
      { id: 1, coord: { x: 0, y: 0, w: 2, h: 2 } },
      { id: 2, coord: { x: 3, y: 3, w: 2, h: 2 } },
    ];

    const ranges = getRanges(1, modules);
    expect(ranges.length).toBe(1);
    expect(ranges[0]).toEqual({ x1: 3, x2: 5, y1: 3, y2: 5 });
  });

  test('handlerModuleDestination', () => {
    const ranges = [{ x1: 3, x2: 5, y1: 3, y2: 5 }];
    const moduleDestination: ModuleDestination = {
      ranges,
      top: 10,
      left: 10,
      w: 2,
      h: 2,
    };

    const position = handlerModuleDestination(moduleDestination);
    expect(position.left).toBe(GUTTER_SIZE);
    expect(position.top).toBe(GUTTER_SIZE);
  });
});
