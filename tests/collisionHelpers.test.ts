import { moduleX2LocalX, moduleY2LocalY } from '../src/helpers/commonHelpers';
import { calculateDestination } from '../src/helpers/collisionHelpers';
import { Range2D, Position } from '../src/types/HelperTypes';

describe('collisionHelpers', () => {
  test('calculateDestination with no overlap', () => {
    const source: Range2D = { x1: 0, x2: 2, y1: 0, y2: 2 };
    const targets: Range2D[] = [{ x1: 3, x2: 5, y1: 3, y2: 5 }];
    const nextPosition: Position = { left: 10, top: 10 };
    
    const destination = calculateDestination(source, targets, nextPosition);
    
    expect(destination).toEqual({ 
      destinationX: moduleX2LocalX(source.x1), 
      destinationY: moduleY2LocalY(source.y1),
    });
  });

  test('calculateDestination with overlap', () => {
    const source: Range2D = { x1: 0, x2: 2, y1: 0, y2: 2 };
    const targets: Range2D[] = [{ x1: 1, x2: 3, y1: 1, y2: 3 }];
    const nextPosition: Position = { left: 10, top: 10 };
    
    const destination = calculateDestination(source, targets, nextPosition);
    
    expect(destination.destinationX).toBeGreaterThan(0);
    expect(destination.destinationY).toBeGreaterThan(0);
  });
});
