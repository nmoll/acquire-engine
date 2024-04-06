import Network from "ts-neuroevolution/dist/declarations/network/network";
import { ALL_HOTELS, IGameState } from "../model";
import { Board } from "../model/board";
import { PlayerAction, PlayerActionType } from "../model/player-action";
import { AvailableAction, ChooseShares } from "../model/available-action";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { HotelManager } from "../model/hotel-manager";

export interface Player {
  playerId: string;

  play(gameState: IGameState, gameInstance: IAcquireGameInstance): PlayerAction;
}

export class SmartPlayer implements Player {
  sharesPurchased = 0;
  sharesMissed = 0;

  constructor(public playerId: string, private purchaseSharesBrain: Network) {}

  play(
    gameState: IGameState,
    gameInstance: IAcquireGameInstance
  ): PlayerAction {
    const availableActions = gameState.availableActionsState;
    const endGame = availableActions.find((a) => a.type === "ChooseEndGame");
    if (endGame) {
      return PlayerActionType.EndGame(this.playerId);
    }
    const purchaseShares = availableActions.find(
      (a) => a.type === "ChooseShares"
    ) as ChooseShares | undefined;
    if (purchaseShares && purchaseShares.shares.length) {
      const inputs = this.getInputs(gameState, gameInstance);
      const outputs = this.purchaseSharesBrain.compute(inputs);
      const max = Math.max(...outputs);
      const desired = ALL_HOTELS[outputs.indexOf(max)];
      const share = purchaseShares.shares.find((s) => s.hotelChain === desired);
      if (share) {
        this.sharesPurchased++;
        return PlayerActionType.PurchaseShares(this.playerId, share.hotelChain);
      } else {
        this.sharesMissed++;
        const other = availableActions.find((a) => a.type !== "ChooseShares");
        if (other) {
          return new RandomPlayer(this.playerId).actionFromAvailable(
            other,
            gameState
          );
        }
      }
    }

    return new RandomPlayer(this.playerId).play(gameState);
  }

  private getInputs(
    gameState: IGameState,
    gameInstance: IAcquireGameInstance
  ): number[] {
    const hotelInputs: number[] = [];
    const hotelManager = new HotelManager(gameState.boardState);
    ALL_HOTELS.forEach((h) => {
      hotelInputs.push(hotelManager.getHotel(h).getSize() / 42);
    });
    const sharesInputs: number[] = [];

    const otherPlayer =
      gameInstance.playerIds.find((p) => p !== this.playerId)?.[0] ?? "";

    ALL_HOTELS.forEach((h) => {
      const shareDiff =
        (gameState.sharesState[this.playerId]?.[h] ?? 0) -
        (gameState.sharesState[otherPlayer]?.[h] ?? 0);
      sharesInputs.push(shareDiff / 25);
    });

    const cashInputs = [gameState.cashState[this.playerId] ?? 0];

    return [...hotelInputs, ...sharesInputs, ...cashInputs];
  }
}

export class RandomPlayer implements Player {
  constructor(public playerId: string) {}

  play(gameState: IGameState): PlayerAction {
    const playerId = gameState.currentPlayerIdState;
    if (!playerId) {
      throw new Error("no current player");
    }

    const endGame = gameState.availableActionsState.find(
      (a) => a.type === "ChooseEndGame"
    );
    if (endGame) {
      return PlayerActionType.EndGame(playerId);
    }

    const available = gameState.availableActionsState[0];

    return this.actionFromAvailable(available, gameState);
  }

  public actionFromAvailable(
    available: AvailableAction,
    gameState: IGameState
  ): PlayerAction {
    let action: PlayerAction | null = null;
    switch (available.type) {
      case "ChooseTile":
        const board = new Board(gameState.boardState);
        let tile = getRandomNumber(available.available);
        const starter = available.available.find((t) =>
          board.isHotelStarter(t)
        );
        if (starter !== undefined) {
          tile = starter;
        }

        if (tile === null || tile === undefined) {
          throw new Error("no available tile");
        }
        action = PlayerActionType.PlaceTile(this.playerId, tile);
        break;
      case "ChooseEndTurn":
        action = PlayerActionType.EndTurn(this.playerId);
        break;
      case "ChooseHotelChain":
        action = PlayerActionType.StartHotelChain(
          this.playerId,
          available.hotelChains[0]
        );
        break;
      case "ChooseShares":
        const random = Math.abs(
          Math.round(Math.random() * available.shares.length - 1)
        );
        const share = available.shares[random] ?? available.shares[0];
        action = PlayerActionType.PurchaseShares(
          this.playerId,
          share.hotelChain
        );
        break;
      case "ChooseMergeDirection":
        action = PlayerActionType.Merge(
          this.playerId,
          available.options[0],
          available.options.slice(1, -1)
        );
        break;
      case "ChooseToSellOrphanedShare":
        action = PlayerActionType.SellOrphanedShare(
          this.playerId,
          available.hotelChain
        );
        break;
    }

    if (!action) {
      throw new Error("no action played");
    }

    return action;
  }
}

function getRandomNumber(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined; // Return undefined if the array is empty
  }
  const randomIndex = Math.floor(Math.random() * numbers.length); // Generate a random index
  return numbers[randomIndex]; // Return the number at the random index
}
