import { COLUMN_WIDTH, GUTTER_SIZE } from '../constants';

/**
 * Converts a module width to a local width.
 * @param moduleW - The width of the module.
 * @returns The local width.
 */
export const moduleW2LocalWidth = (moduleW: number) => moduleW * COLUMN_WIDTH - GUTTER_SIZE;

/**
 * Converts a module X coordinate to a local X coordinate.
 * @param moduleX - The X coordinate of the module.
 * @returns The local X coordinate.
 */
export const moduleX2LocalX = (moduleX: number) => moduleW2LocalWidth(moduleX) + GUTTER_SIZE * 2;

/**
 * Converts a module Y coordinate to a local Y coordinate.
 * @param moduleY - The Y coordinate of the module.
 * @returns The local Y coordinate.
 */
export const moduleY2LocalY = (moduleY: number) => moduleY + GUTTER_SIZE;

/**
 * Converts a local X coordinate to a module X coordinate.
 * @param localX - The local X coordinate.
 * @returns The module X coordinate.
 */
export const localX2ModuleX = (localX: number) => (localX - GUTTER_SIZE) / COLUMN_WIDTH;

/**
 * Converts a local Y coordinate to a module Y coordinate.
 * @param localY - The local Y coordinate.
 * @returns The module Y coordinate.
 */
export const localY2ModuleY = (localY: number) => localY - GUTTER_SIZE;
