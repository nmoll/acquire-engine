import { PlayerAction } from "../../model/player-action";
import { ITileState } from "../../model/tile-state";
import { RandomUtils } from "../../utils/random-utils";

const NUM_OF_TILES = 108;

// const fillPlayerTiles =

const getInitialState = (playerIds: number[]): ITileState => {
  const availableTiles = new Array(NUM_OF_TILES).map((_, idx) => idx);

  const randomGenerator = RandomUtils.randomGenerator(1);

  return {
    availableTiles,
  };
};

export const computeState = (
  playerIds: number[] = [],
  playerAction: PlayerAction | null = null,
  tileState: ITileState | null = null
): ITileState => {
  if (!tileState) {
    return {
      availableTiles: [],
    };
  }

  return playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]: [],
    }),
    tileState
  );
};

export const TileStateEngine = {
  computeState,
};
