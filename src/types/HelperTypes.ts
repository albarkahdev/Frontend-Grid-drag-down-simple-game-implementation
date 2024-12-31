export type ModuleDestination = {
  top: number;
  left: number;
  w: number;
  h: number;
  ranges: Range2D[];
};

export type Position = {
  top: number;
  left: number;
};

export type Destination = {
  destinationX: number;
  destinationY: number;
};

export type Range2D = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type GetValueAfterCollisionArgument = {
  rangesX: Range2D[];
  rangesY: Range2D[];
  targetX: number;
  targetY: number;
};

export type CheckIfItemWillOverlapArgument = {
  rangeXSource: Range2D;
  rangeYSource: Range2D;
  rangeXTarget: Range2D;
  rangeYTarget: Range2D;
};

export type DirectionComing = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';

export type PositionArgument = {
  source: Range2D;
  target: Range2D;
  directionComing: DirectionComing;
  w: number;
  h: number;
};

export type DirectionComingArgument = {
  source: Range2D;
  target: Range2D;
  isYOverlapMore: boolean;
};

