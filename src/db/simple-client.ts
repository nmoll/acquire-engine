import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import { DatabaseClient } from "./database-client";

const url = "/api";

interface GameData {
  instance: IAcquireGameInstance;
  actions: PlayerAction[];
}

export class SimpleDatabaseClient implements DatabaseClient {
  private poller: RequestPoller | null = null;

  getGame(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ): void {
    this.fetchGameData(gameId).then((data: GameData) => {
      callback(data.instance);
    });
  }

  onGameChanged(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ): void {
    if (this.poller && this.poller.gameId != gameId) {
      this.poller.stop();
    }

    if (!this.poller) {
      this.poller = new RequestPoller(gameId);
    }
    this.poller.addListener({
      watch: "instance",
      callback,
    });
  }

  createGame(game: IAcquireGameInstance): void {
    fetch(`${url}/game/${game.id}`, {
      method: "POST",
      body: JSON.stringify({
        instance: game,
      }),
    });
  }

  updateGameInstance(instance: IAcquireGameInstance): void {
    fetch(`${url}/game/${instance.id}`, {
      method: "POST",
      body: JSON.stringify({ instance }),
    });
    if (this.poller && this.poller.gameId === instance.id) {
      this.poller.notifyInstanceChanged(instance);
    }
  }

  deleteGame(_gameId: string, _callback?: (() => void) | undefined): void {}

  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ): void {
    if (this.poller && this.poller.gameId != gameId) {
      this.poller.stop();
    }

    if (!this.poller) {
      this.poller = new RequestPoller(gameId);
    }

    this.poller.addListener({
      watch: "actions",
      callback,
    });
  }

  updateActions(gameId: string, actions: PlayerAction[]): void {
    fetch(`${url}/game/${gameId}`, {
      method: "PATCH",
      body: JSON.stringify({
        actions,
      }),
    });
    if (this.poller && this.poller.gameId === gameId) {
      this.poller.notifyActionsChanged(actions);
    }
  }

  leaveGame(): void {
    if (this.poller) {
      this.poller.stop();
      this.poller = null;
    }
  }

  private async fetchGameData(id: string): Promise<GameData> {
    const resp = await fetch(`${url}/game/${id}`);
    return resp.json();
  }
}

type GameDataCallbackConfig =
  | {
      watch: "instance";
      callback: (instance: IAcquireGameInstance) => void;
    }
  | {
      watch: "actions";
      callback: (actions: PlayerAction[]) => void;
    };

class RequestPoller {
  private interval: any | null = null;
  private listeners: GameDataCallbackConfig[] = [];
  private gameData: GameData | null = null;

  constructor(public gameId: string) {}

  async addListener(callback: GameDataCallbackConfig) {
    this.listeners.push(callback);

    this.pollData(true);

    if (!this.interval) {
      this.interval = this.interval = setInterval(async () => {
        this.pollData();
      }, 2000);
    }
  }

  private async pollData(isFirstPoll?: boolean) {
    const resp = await fetch(`${url}/game/${this.gameId}`);
    const data: GameData = await resp.json();
    if (!this.instanceEquals(data.instance, this.gameData?.instance ?? null)) {
      this.notifyInstanceChanged(data.instance);
    }
    if (
      isFirstPoll ||
      (data.actions?.length ?? 0) > (this.gameData?.actions?.length ?? 0)
    ) {
      this.notifyActionsChanged(data.actions);
    }
    this.gameData = data;
  }

  notifyActionsChanged(actions: PlayerAction[]) {
    if (this.gameData) {
      this.gameData.actions = actions;
    }
    this.listeners.forEach((config) => {
      if (config.watch === "actions") {
        config.callback(actions);
      }
    });
  }

  notifyInstanceChanged(instance: IAcquireGameInstance) {
    if (this.gameData) {
      this.gameData.instance = instance;
    }
    this.listeners.forEach((config) => {
      if (config.watch === "instance") {
        config.callback(instance);
      }
    });
  }

  stop() {
    this.listeners = [];
    clearInterval(this.interval);
  }

  private instanceEquals(
    a: IAcquireGameInstance | null,
    b: IAcquireGameInstance | null
  ) {
    if (!a || !b) {
      return false;
    }
    return (
      a.id === b.id &&
      a.isOpen === b.isOpen &&
      a.playerIds.length === b.playerIds.length &&
      a.state === b.state
    );
  }
}
