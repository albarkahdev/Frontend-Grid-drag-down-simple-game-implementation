import { GUTTER_SIZE } from '../constants';
import { moduleX2LocalX, moduleY2LocalY } from './commonHelpers';
import {
  DirectionComing,
  DirectionComingArgument,
  PositionArgument,
  Range2D,
  Position,
  Destination,
} from '../types/HelperTypes';

/**
 * Checks if two ranges overlap.
 * @param start1 - Start of the first range.
 * @param end1 - End of the first range.
 * @param start2 - Start of the second range.
 * @param end2 - End of the second range.
 * @returns True if the ranges overlap, false otherwise.
 */
const isRangeOverlap = (start1: number, end1: number, start2: number, end2: number): boolean => {
  return start1 < end2 && end1 > start2;
};

/**
 * Checks if two 2D ranges overlap.
 * @param source - The source range.
 * @param target - The target range.
 * @returns True if the ranges overlap, false otherwise.
 */
const is2DRangeOverlap = (source: Range2D, target: Range2D): boolean => {
  return isRangeOverlap(source.x1, source.x2, target.x1, target.x2) && isRangeOverlap(source.y1, source.y2, target.y1, target.y2);
};

/**
 * Calculates the amount of overlap between two ranges.
 * @param start1 - Start of the first range.
 * @param end1 - End of the first range.
 * @param start2 - Start of the second range.
 * @param end2 - End of the second range.
 * @returns The amount of overlap.
 */
const getOverlapAmount = (start1: number, end1: number, start2: number, end2: number): number => {
  const twoSize = end2 - start2;
  const overlapStart = Math.max(start1, start2);
  const overlapEnd = Math.min(end1, end2);
  return (overlapEnd - overlapStart) / twoSize;
};

/**
 * Determines the direction from which a collision is coming.
 * @param args - The arguments to determine the direction.
 * @returns The direction of the collision.
 */
const getDirectionComing = ({ source, target, isYOverlapMore }: DirectionComingArgument) : DirectionComing => {
  // will be move on x axis
  if (isYOverlapMore) {
    if (source.x1 < target.x1) {
      return 'LEFT';
    }
    return 'RIGHT';
  }
  // will be move on y axis
  if (source.y1 < target.y1) {
    return 'TOP';
  }
  return 'BOTTOM';
};

/**
 * Calculates the reset position after a collision.
 * @param args - The arguments to determine the reset position.
 * @returns The reset position.
 */
const getResetPosition = ({ source, target, directionComing, w, h }: PositionArgument) => {
  switch (directionComing) {
    case 'LEFT':
      return {
        x1: target.x1 - (source.x2 - source.x1),
        x2: target.x1 - (source.x2 - source.x1) + h,
        y1: source.y1,
        y2: source.y1 + w,
      };
    case 'RIGHT':
      return {
        x1: target.x2,
        x2: target.x2 + h,
        y1: source.y1,
        y2: source.y1 + w,
      };
    case 'TOP':
      return {
        x1: source.x1,
        x2: source.x1 + h,
        y1: target.y1 - (source.y2 - source.y1) - GUTTER_SIZE,
        y2: target.y1 - (source.y2 - source.y1) - GUTTER_SIZE + w,
      };
  
    default:
      return {
        x1: source.x1,
        x2: source.x1 + h,
        y1: target.y2 + GUTTER_SIZE,
        y2: target.y2 + GUTTER_SIZE + w,
      };
  }
};

/**
 * Calculates the overlap position after a collision.
 * @param args - The arguments to determine the overlap position.
 * @returns The overlap position.
 */
const getOverlapPosition = ({ source, target, directionComing, w, h }: PositionArgument) => {
  switch (directionComing) {
    case 'LEFT':
      return {
        x1: target.x2,
        x2: target.x2 + h,
        y1: source.y1,
        y2: source.y1 + w,
      };
    case 'RIGHT':
      return {
        x1: target.x1 - (source.x2 - source.x1),
        x2: target.x1 - (source.x2 - source.x1) + h,
        y1: source.y1,
        y2: source.y1 + w,
      };
    case 'TOP':
      return {
        x1: source.x1,
        x2: source.x1 + h,
        y1: target.y2 + GUTTER_SIZE,
        y2: target.y2 + GUTTER_SIZE + w,
      };
  
    default:
      return {
        x1: source.x1,
        x2: source.x1 + h,
        y1: target.y1 - (source.y2 - source.y1) - GUTTER_SIZE,
        y2: target.y1 - (source.y2 - source.y1) - GUTTER_SIZE + w,
      };
  }
};

/**
 * Calculates the destination position after handling collisions.
 * @param source - The source range.
 * @param targets - The target ranges.
 * @param nextPosition - The next position.
 * @returns The destination coordinates.
 */
export const calculateDestination = (source: Range2D, targets: Range2D[], nextPosition: Position): Destination => {
  let finalPosition = source;
  let destinationX = nextPosition.left;
  let destinationY = nextPosition.top;
  const w = source.x2 - source.x1;
  const h = source.y2 - source.y1;

  for (const target of targets) {
    if (!is2DRangeOverlap(finalPosition, target)) {
      continue;
    }

    const xOverlapPercent = getOverlapAmount(finalPosition.x1, finalPosition.x2, target.x1, target.x2);
    const yOverlapPercent = getOverlapAmount(finalPosition.y1, finalPosition.y2, target.y1, target.y2);
    const directionComing = getDirectionComing({ source: finalPosition, target, isYOverlapMore: xOverlapPercent < yOverlapPercent });

    // Not enough overlap to move, so will be reset
    const borderOverlap = 0.5;
    if (xOverlapPercent < borderOverlap || yOverlapPercent < borderOverlap) {
      finalPosition = getResetPosition({ source: finalPosition, target, directionComing, w, h });
      destinationX = moduleX2LocalX(finalPosition.x1);
      destinationY = moduleY2LocalY(finalPosition.y1);
    } else {
      // Enough overlap, need to calculate overlap position
      finalPosition = getOverlapPosition({ source: finalPosition, target, directionComing, w, h });
      destinationX = moduleX2LocalX(finalPosition.x1);
      destinationY = moduleY2LocalY(finalPosition.y1);
    }
  }

  return { destinationX, destinationY };
};
