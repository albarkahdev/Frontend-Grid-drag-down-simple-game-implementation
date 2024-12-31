import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useDrag, useDragDropManager } from 'react-dnd';
import { useRafLoop } from 'react-use';

import ModuleInterface from '../types/ModuleInterface';
import {
  localX2ModuleX,
  localY2ModuleY,
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
} from '../helpers/commonHelpers';
import { getRanges, handlerModuleDestination } from '../helpers/movementHelpers';

type ModuleProps = {
  data: ModuleInterface;
  modules: ModuleInterface[];
  handleChanges: (id: number, data: ModuleInterface) => void;
};

const Module = (props: ModuleProps) => {
  const { data, modules, handleChanges } = props;
  const { id, coord: { x, y, w, h } } = data;

  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleY2LocalY(y),
    left: moduleX2LocalX(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();

  const ranges = useMemo(() => {
    return getRanges(id, modules);
  }, [id, modules]);

  // Use request animation frame to process dragging
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Apply rule of the position including gutter and collision
    const { top: topTarget, left: leftTarget } = handlerModuleDestination({
      ranges,
      top: initialPosition.current.top + movement.y,
      left: initialPosition.current.left + movement.x,
      w,
      h,
    });

    // Update new position of the module
    setPosition({
      top: topTarget,
      left: leftTarget,
    });
  }, false);

  const handleDropItem = () => {
    // Update module data after item droped
    const updatedData = {
      ...data,
      coord: {
        ...data.coord,
        x: localX2ModuleX(left),
        y: localY2ModuleY(top),
      },
    };
    handleChanges(id, updatedData);
    stop();
  };

  // Wire the module to DnD drag system
  const [, drag] = useDrag(() => ({
    type: 'module',
    item: () => {
      // Track the initial position at the beginning of the drag operation
      initialPosition.current = { top, left };

      // Start raf
      start();
      return { id };
    },
    end: handleDropItem,
  }), [top, left, data]);

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor="grey.500"
      padding="10px"
      bgcolor="rgba(0, 0, 0, 0.5)"
      top={top}
      left={left}
      width={moduleW2LocalWidth(w)}
      height={h}
      sx={{
        transitionProperty: 'top, left',
        transitionDuration: '0.1s',
        '& .resizer': {
          opacity: 0,
        },
        '&:hover .resizer': {
          opacity: 1,
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={40}
        color="#fff"
        sx={{ cursor: 'move' }}
        draggable
      >
        <Box sx={{ userSelect: 'none', pointerEvents: 'none' }}>{id}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(Module);
