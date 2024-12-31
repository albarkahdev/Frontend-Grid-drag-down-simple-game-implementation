// movementHelpers.ts
import { BIG_COLUMN_IN_PIXEL, COLUMN_WIDTH, CONTAINER_WIDTH, GUTTER_SIZE, SMALL_COLUMN_IN_PIXEL } from '../constants';
import { localX2ModuleX, localY2ModuleY, moduleX2LocalX } from './commonHelpers';
import { ModuleDestination, Position } from '../types/HelperTypes';
import ModuleInterface from '../types/ModuleInterface';
import { calculateDestination } from './collisionHelpers';

/**
 * Calculates the width in pixels based on the number of columns.
 * @param w - The number of columns.
 * @returns The width in pixels.
 */
export const getWidthInPixel = (w: number) => {
  if (w <= 1) {
    return BIG_COLUMN_IN_PIXEL;
  }

  const smallColumnInLocal = w - 1;
  const bigColumnInLocal = w;
  return (
    bigColumnInLocal * BIG_COLUMN_IN_PIXEL +
    smallColumnInLocal * SMALL_COLUMN_IN_PIXEL
  );
};

/**
 * Gets the X range of a module.
 * @param x - The X coordinate.
 * @param w - The width of the module.
 * @returns The X range.
 */
const getModuleXRange = (x: number, w: number) => {
  return {
    x1: x,
    x2: x + w,
  };
};

/**
 * Gets the Y range of a module.
 * @param y - The Y coordinate.
 * @param h - The height of the module.
 * @returns The Y range.
 */
const getModuleYRange = (y: number, h: number) => {
  return {
    y1: y,
    y2: y + h,
  };
};

/**
 * Gets the ranges of all modules except the one with the specified ID.
 * @param id - The ID of the module to exclude.
 * @param modules - The list of modules.
 * @returns The list of ranges.
 */
export const getRanges = (id: number, modules: ModuleInterface[]) => {
  const ranges = [];

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    if (module.id !== id) {
      const { x, y, w, h } = module.coord;
      const xRange = getModuleXRange(x, w);
      const yRange = getModuleYRange(y, h);
      const range = {
        ...xRange,
        ...yRange,
      };
      ranges.push(range);
    }
  }

  return ranges;
};

/**
 * Handles the destination of a module based on collisions and snapping to the grid.
 * @param moduleDestination - The module's destination and related data.
 * @returns The calculated position.
 */
export const handlerModuleDestination = ({
  ranges,
  top,
  left,
  w,
  h,
}: ModuleDestination): Position => {
  // Prevent item from moving beyond top and left gutter
  let topTarget: number = GUTTER_SIZE;
  let leftTarget: number = GUTTER_SIZE;

  // Round top to snap on the row line
  if (top >= GUTTER_SIZE) topTarget = Math.round(top / 10) * 10;

  // Round left to snap on the column line
  if (left >= GUTTER_SIZE) {
    const xMod = left % COLUMN_WIDTH;
    leftTarget = (COLUMN_WIDTH / 2) > xMod ? left - xMod : left - xMod + COLUMN_WIDTH;
    leftTarget = leftTarget + GUTTER_SIZE;
  }

  // Prevent item from moving beyond right gutter
  const leftMaxValue = CONTAINER_WIDTH - moduleX2LocalX(w) + GUTTER_SIZE;
  if (leftTarget > leftMaxValue) leftTarget = leftMaxValue;

  const source = {
    x1: localX2ModuleX(leftTarget),
    x2: Math.floor(localX2ModuleX(leftTarget + moduleX2LocalX(w))),
    y1: localY2ModuleY(topTarget),
    y2: localY2ModuleY(topTarget + h),
  };

  // Expected next position after applying rules for gutter
  const nextPosition = {
    top: topTarget,
    left: leftTarget,
  };

  const { destinationX, destinationY } = calculateDestination(source, ranges, nextPosition);

  return { left: destinationX, top: destinationY };
};
